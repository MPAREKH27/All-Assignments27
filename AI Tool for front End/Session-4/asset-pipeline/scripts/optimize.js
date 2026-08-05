import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = path.join(process.cwd(), 'src', 'assets', 'images');

const files = fs.readdirSync(imgDir);

console.log('Found image files:', files);

async function optimizeAll() {
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const inputPath = path.join(imgDir, file);
      const originalStats = fs.statSync(inputPath);
      const baseName = file.substring(0, file.lastIndexOf('.'));
      
      // Convert to WebP under 200KB
      const webpPath = path.join(imgDir, `${baseName}_optimized.webp`);
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80, compressionLevel: 6 })
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);

      // Save a clean PNG version for icons/downloads
      const pngPath = path.join(imgDir, `${baseName}.png`);
      await sharp(inputPath)
        .png({ compressionLevel: 8 })
        .toFile(pngPath);

      const pngStats = fs.statSync(pngPath);

      console.log(`\nProcessed ${file}:`);
      console.log(` - Original JPG: ${(originalStats.size / 1024).toFixed(2)} KB`);
      console.log(` - Optimized WebP: ${(webpStats.size / 1024).toFixed(2)} KB`);
      console.log(` - Converted PNG: ${(pngStats.size / 1024).toFixed(2)} KB`);
    }
  }
}

optimizeAll().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
