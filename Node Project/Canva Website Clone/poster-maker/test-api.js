const http = require('http');
const fs = require('fs');
const path = require('path');
const app = require('./server');

const TEST_PORT = 3001;

async function runTests() {
  const server = app.listen(TEST_PORT, () => {
    console.log(`Test server running on port ${TEST_PORT}`);
  });

  const baseUrl = `http://localhost:${TEST_PORT}`;

  try {
    console.log('\n--- Test 1: GET / (Root Route Static HTML) ---');
    const resRoot = await fetch(`${baseUrl}/`);
    const rootText = await resRoot.text();
    console.log(`Status: ${resRoot.status}`);
    console.log(`Contains Canva Poster Maker: ${rootText.includes('Canva Poster Maker')}`);
    if (resRoot.status !== 200 || !rootText.includes('Canva')) throw new Error('Test 1 failed');
    console.log('Test 1 Passed: Root route serves static HTML.\n');

    console.log('--- Test 2: GET /templates (5 Templates Array) ---');
    const resTemplates = await fetch(`${baseUrl}/templates`);
    const templates = await resTemplates.json();
    console.log(`Status: ${resTemplates.status}`);
    console.log(`Template Count: ${templates.length}`);
    console.log(`First Template:`, templates[0]);
    if (resTemplates.status !== 200 || !Array.isArray(templates) || templates.length !== 5) {
      throw new Error('Test 2 failed: Must return array of 5 templates');
    }
    const hasKeys = templates.every(t => t.id && t.name && t.imageUrl);
    if (!hasKeys) throw new Error('Test 2 failed: Missing id, name, or imageUrl');
    console.log('Test 2 Passed: 5 template objects returned with id, name, imageUrl.\n');

    console.log('--- Test 3: POST /design (Create Design) ---');
    const designPayload = {
      text: "Rock & Roll World Tour 2026",
      templateId: templates[0].id
    };
    const resDesign = await fetch(`${baseUrl}/design`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(designPayload)
    });
    const designData = await resDesign.json();
    console.log(`Status: ${resDesign.status}`);
    console.log(`Response:`, designData);
    if (resDesign.status !== 201 || !designData.design || designData.design.text !== designPayload.text) {
      throw new Error('Test 3 failed: Design creation failed');
    }
    const createdDesignId = designData.design.id;
    console.log(`Test 3 Passed: Design created with ID ${createdDesignId}.\n`);

    console.log('--- Test 4: POST /upload (Upload Logo with Multer) ---');
    // Create a temporary sample logo image
    const sampleLogoPath = path.join(__dirname, 'test-sample-logo.png');
    // 1x1 transparent PNG buffer
    const pngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
    fs.writeFileSync(sampleLogoPath, pngBuffer);

    const formData = new FormData();
    const fileBlob = new Blob([pngBuffer], { type: 'image/png' });
    formData.append('image', fileBlob, 'brand-logo.png');

    const resUpload = await fetch(`${baseUrl}/upload`, {
      method: 'POST',
      body: formData
    });
    const uploadData = await resUpload.json();
    console.log(`Status: ${resUpload.status}`);
    console.log(`Response:`, uploadData);
    if (resUpload.status !== 200 || !uploadData.fileUrl) {
      throw new Error('Test 4 failed: File upload failed');
    }
    console.log('Test 4 Passed: Image uploaded successfully via multer, fileUrl returned.\n');

    // Clean up sample logo
    if (fs.existsSync(sampleLogoPath)) fs.unlinkSync(sampleLogoPath);

    console.log('--- Test 5: PATCH /design/:id/color (Background Color Selection) ---');
    const colorPayload = { backgroundColor: '#7D2AE8' };
    const resColor = await fetch(`${baseUrl}/design/${createdDesignId}/color`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(colorPayload)
    });
    const colorData = await resColor.json();
    console.log(`Status: ${resColor.status}`);
    console.log(`Response:`, colorData);
    if (resColor.status !== 200 || colorData.design.backgroundColor !== '#7D2AE8') {
      throw new Error('Test 5 failed: Background color update failed');
    }
    console.log('Test 5 Passed: Background color updated successfully on the design object.\n');

    console.log('====================================================');
    console.log('ALL 5 REQUIREMENTS VERIFIED AND PASSED SUCCESSFULLY!');
    console.log('====================================================\n');

  } catch (err) {
    console.error('Test Execution Error:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runTests();

