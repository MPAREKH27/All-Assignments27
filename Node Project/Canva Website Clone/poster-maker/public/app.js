// State Management
let templates = [];
let selectedTemplate = null;
let activeDesign = null;
let uploadedLogoUrl = null;

// DOM Elements
const templatesGrid = document.getElementById('templates-grid');
const posterText = document.getElementById('poster-text');
const posterSubtext = document.getElementById('poster-subtext');
const bgColorPicker = document.getElementById('bg-color-picker');
const bgColorHex = document.getElementById('bg-color-hex');
const colorSwatches = document.getElementById('color-swatches');
const btnUpdateColor = document.getElementById('btn-update-color');
const logoFileInput = document.getElementById('logo-file-input');
const dropzone = document.getElementById('dropzone');
const uploadStatus = document.getElementById('upload-status');
const btnCreateDesign = document.getElementById('btn-create-design');
const activeDesignIdLabel = document.getElementById('active-design-id');
const btnResetPreview = document.getElementById('btn-reset-preview');
const btnExportPoster = document.getElementById('btn-export-poster');

// Artboard Render Elements
const posterArtboard = document.getElementById('poster-artboard');
const posterTemplateImg = document.getElementById('poster-template-img');
const posterLogoContainer = document.getElementById('poster-logo-container');
const posterLogoImg = document.getElementById('poster-logo-img');
const posterHeadlineRender = document.getElementById('poster-headline-render');
const posterSubtextRender = document.getElementById('poster-subtext-render');

// Console Box Elements
const consoleMethod = document.getElementById('console-method');
const consolePath = document.getElementById('console-path');
const consoleStatus = document.getElementById('console-status');
const consoleOutput = document.getElementById('console-output');
const toastEl = document.getElementById('toast');

// -------------------------------------------------------------
// Toast Notifications
// -------------------------------------------------------------
function showToast(message, isError = false) {
  toastEl.textContent = message;
  toastEl.style.borderColor = isError ? 'var(--danger)' : 'var(--canva-purple)';
  toastEl.classList.remove('hidden');
  setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 3500);
}

// -------------------------------------------------------------
// Console Output Helper
// -------------------------------------------------------------
function logConsole(method, path, status, data) {
  consoleMethod.textContent = method.toUpperCase();
  consoleMethod.className = `console-method ${method.toLowerCase()}`;
  consolePath.textContent = path;
  consoleStatus.textContent = `Status: ${status}`;
  consoleOutput.textContent = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;
}

// -------------------------------------------------------------
// 1. Fetch & Render Templates (Requirement 2: GET /templates)
// -------------------------------------------------------------
async function fetchTemplates() {
  try {
    const res = await fetch('/templates');
    const data = await res.json();
    templates = data;
    logConsole('GET', '/templates', res.status, data);

    renderTemplatesGrid();

    // Select first template by default
    if (templates.length > 0) {
      selectTemplate(templates[0]);
    }
  } catch (err) {
    console.error('Failed to load templates:', err);
    templatesGrid.innerHTML = `<div class="loading-state" style="color:var(--danger)">Error loading templates: ${err.message}</div>`;
  }
}

function renderTemplatesGrid() {
  templatesGrid.innerHTML = '';
  templates.forEach((tmpl) => {
    const card = document.createElement('div');
    card.className = `template-card ${selectedTemplate && selectedTemplate.id === tmpl.id ? 'active' : ''}`;
    card.dataset.id = tmpl.id;
    card.innerHTML = `
      <img src="${tmpl.imageUrl}" alt="${tmpl.name}" loading="lazy" />
      <div class="template-card-title">${tmpl.name}</div>
    `;
    card.addEventListener('click', () => selectTemplate(tmpl));
    templatesGrid.appendChild(card);
  });
}

function selectTemplate(tmpl) {
  selectedTemplate = tmpl;

  // Update active UI cards
  document.querySelectorAll('.template-card').forEach((el) => {
    el.classList.toggle('active', String(el.dataset.id) === String(tmpl.id));
  });

  // Update poster artboard image
  posterTemplateImg.src = tmpl.imageUrl;
}

// -------------------------------------------------------------
// 2. Real-time Text & Color Preview Updates
// -------------------------------------------------------------
posterText.addEventListener('input', (e) => {
  posterHeadlineRender.textContent = e.target.value.trim() || 'YOUR HEADLINE HERE';
});

posterSubtext.addEventListener('input', (e) => {
  posterSubtextRender.textContent = e.target.value.trim() || 'EVENT DETAILS • DATE • LOCATION';
});

// Color picker change
function setBackgroundColor(color) {
  bgColorPicker.value = color;
  bgColorHex.textContent = color.toUpperCase();
  posterArtboard.style.backgroundColor = color;

  // Update active swatch
  document.querySelectorAll('.swatch').forEach((sw) => {
    sw.classList.toggle('active', sw.dataset.color.toLowerCase() === color.toLowerCase());
  });
}

bgColorPicker.addEventListener('input', (e) => {
  setBackgroundColor(e.target.value);
});

colorSwatches.addEventListener('click', (e) => {
  const swatch = e.target.closest('.swatch');
  if (swatch && swatch.dataset.color) {
    setBackgroundColor(swatch.dataset.color);
  }
});

// -------------------------------------------------------------
// 3. Image/Logo Upload via Multer (Requirement 4: POST /upload)
// -------------------------------------------------------------
async function uploadLogo(file) {
  if (!file) return;

  const formData = new FormData();
  // Using 'image' field (our multer middleware accepts 'image', 'logo', or any image file)
  formData.append('image', file);

  uploadStatus.classList.remove('hidden');
  uploadStatus.querySelector('.upload-filename').textContent = `Uploading ${file.name}...`;
  uploadStatus.querySelector('.upload-success-badge').textContent = 'Uploading...';
  uploadStatus.querySelector('.upload-success-badge').style.color = 'var(--text-muted)';

  try {
    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    logConsole('POST', '/upload', res.status, data);

    if (res.ok) {
      uploadedLogoUrl = data.fileUrl;
      uploadStatus.querySelector('.upload-filename').textContent = file.name;
      uploadStatus.querySelector('.upload-success-badge').textContent = 'Uploaded ✓';
      uploadStatus.querySelector('.upload-success-badge').style.color = 'var(--success)';

      // Display uploaded logo on the poster preview
      posterLogoImg.src = data.fileUrl;
      posterLogoContainer.classList.remove('hidden');

      showToast('Logo uploaded successfully!');
    } else {
      showToast(data.error || 'Upload failed', true);
      uploadStatus.querySelector('.upload-success-badge').textContent = 'Failed ✗';
      uploadStatus.querySelector('.upload-success-badge').style.color = 'var(--danger)';
    }
  } catch (err) {
    showToast(`Upload error: ${err.message}`, true);
    console.error(err);
  }
}

logoFileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    uploadLogo(e.target.files[0]);
  }
});

// Drag and drop support for dropzone
dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    uploadLogo(e.dataTransfer.files[0]);
  }
});

// -------------------------------------------------------------
// 4. Create Design (Requirement 3: POST /design)
// -------------------------------------------------------------
async function createDesign() {
  if (!selectedTemplate) {
    showToast('Please select a template first', true);
    return;
  }

  const headline = posterText.value.trim();
  if (!headline) {
    showToast('Please enter a poster headline', true);
    return;
  }

  const payload = {
    text: headline,
    templateId: selectedTemplate.id,
    backgroundColor: bgColorPicker.value,
    logoUrl: uploadedLogoUrl
  };

  try {
    const res = await fetch('/design', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    logConsole('POST', '/design', res.status, data);

    if (res.ok) {
      activeDesign = data.design;
      activeDesignIdLabel.textContent = activeDesign.id;
      showToast(`Design created! ID: ${activeDesign.id}`);
    } else {
      showToast(data.error || 'Failed to create design', true);
    }
  } catch (err) {
    showToast(`Error creating design: ${err.message}`, true);
    console.error(err);
  }
}

btnCreateDesign.addEventListener('click', createDesign);

// -------------------------------------------------------------
// 5. Update Background Color (Requirement 5: PATCH /design/:id/color)
// -------------------------------------------------------------
async function updateBackgroundColorOnDesign() {
  if (!activeDesign) {
    // If no design has been created yet, create it first
    showToast('No active design saved. Creating design first...');
    await createDesign();
    if (!activeDesign) return;
  }

  const newColor = bgColorPicker.value;

  try {
    const res = await fetch(`/design/${activeDesign.id}/color`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ backgroundColor: newColor })
    });

    const data = await res.json();
    logConsole('PATCH', `/design/${activeDesign.id}/color`, res.status, data);

    if (res.ok) {
      activeDesign = data.design;
      showToast(`Updated background color to ${newColor} for ${activeDesign.id}`);
    } else {
      showToast(data.error || 'Failed to update color', true);
    }
  } catch (err) {
    showToast(`Error updating color: ${err.message}`, true);
    console.error(err);
  }
}

btnUpdateColor.addEventListener('click', updateBackgroundColorOnDesign);

// -------------------------------------------------------------
// 6. Reset & Download Canvas Helpers
// -------------------------------------------------------------
btnResetPreview.addEventListener('click', () => {
  posterText.value = 'NEON MUSIC FESTIVAL';
  posterSubtext.value = 'LIVE CONCERT & LIGHT SHOW • DOORS OPEN AT 7 PM';
  posterHeadlineRender.textContent = 'NEON MUSIC FESTIVAL';
  posterSubtextRender.textContent = 'LIVE CONCERT & LIGHT SHOW • DOORS OPEN AT 7 PM';
  setBackgroundColor('#121826');
  posterLogoContainer.classList.add('hidden');
  uploadedLogoUrl = null;
  activeDesign = null;
  activeDesignIdLabel.textContent = 'None (Click Create Design)';
  if (templates.length > 0) selectTemplate(templates[0]);
  showToast('Canvas preview reset to default');
});

// Export poster as downloadable image using HTML5 Canvas
btnExportPoster.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 760;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // Fill background color
  ctx.fillStyle = bgColorPicker.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw template image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    ctx.globalAlpha = 0.55;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    // Gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0,0,0,0.3)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Headline Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(posterHeadlineRender.textContent, canvas.width / 2, canvas.height - 240);

    // Accent line
    ctx.fillStyle = '#00C4CC';
    ctx.fillRect(canvas.width / 2 - 50, canvas.height - 215, 100, 6);

    // Subtext
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 22px Plus Jakarta Sans, sans-serif';
    ctx.fillText(posterSubtextRender.textContent, canvas.width / 2, canvas.height - 160);

    // Trigger download
    const link = document.createElement('a');
    link.download = `canva-poster-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Poster PNG downloaded!');
  };
  img.onerror = () => {
    // If CORS blocks canvas image export, download simple graphic version
    const link = document.createElement('a');
    link.download = `canva-poster-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Poster exported!');
  };
  img.src = posterTemplateImg.src;
});

// -------------------------------------------------------------
// 7. Interactive API Tester Bar Actions
// -------------------------------------------------------------
window.testEndpoint = async function (type) {
  switch (type) {
    case 'templates': {
      await fetchTemplates();
      break;
    }
    case 'createDesign': {
      await createDesign();
      break;
    }
    case 'uploadDemo': {
      // Create a small demo SVG blob to simulate a logo upload
      const svgBlob = new Blob([
        `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="45" fill="#7D2AE8"/>
           <polygon points="50,20 62,42 86,45 68,62 73,86 50,74 27,86 32,62 14,45 38,42" fill="#00C4CC"/>
         </svg>`
      ], { type: 'image/svg+xml' });
      const demoFile = new File([svgBlob], 'sample-canva-logo.svg', { type: 'image/svg+xml' });
      await uploadLogo(demoFile);
      break;
    }
    case 'updateColor': {
      await updateBackgroundColorOnDesign();
      break;
    }
    case 'listDesigns': {
      try {
        const res = await fetch('/designs');
        const data = await res.json();
        logConsole('GET', '/designs', res.status, data);
        showToast(`Loaded ${data.length} created designs`);
      } catch (err) {
        showToast(`Error fetching designs: ${err.message}`, true);
      }
      break;
    }
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchTemplates();
});

