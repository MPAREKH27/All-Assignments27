const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// -------------------------------------------------------------
// Middleware
// -------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded images statically from '/uploads'
app.use('/uploads', express.static(uploadDir));

// -------------------------------------------------------------
// In-Memory Data Stores
// -------------------------------------------------------------
// 1. Templates list (Requirement 2: 5 poster template objects)
const templates = [
  {
    id: 1,
    name: "Neon Music Festival",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Tech Innovation Summit",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Tropical Summer Beach Party",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Minimalist Modern Art Expo",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Fitness & Marathon Challenge",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
  }
];

// In-memory designs storage
const designs = new Map();

// -------------------------------------------------------------
// Multer Configuration (Requirement 4)
// -------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${cleanName || 'upload'}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    const allowedMime = /^image\/(png|jpe?g|webp|svg\+xml|gif)$/i;
    if (allowedMime.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only image files (PNG, JPG, JPEG, WEBP, SVG, GIF) are allowed.'));
    }
  }
});

// Helper middleware accepting either 'image', 'logo', or any single image upload
const handleImageUpload = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size limit exceeded (max 5MB).' });
      }
      return res.status(400).json({ error: `Multer upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    const file = (req.files && req.files.length > 0) ? req.files[0] : req.file;
    if (!file) {
      return res.status(400).json({ error: "No image file provided. Please attach a file using the 'image' or 'logo' field." });
    }
    req.uploadedFile = file;
    next();
  });
};

// -------------------------------------------------------------
// Routes
// -------------------------------------------------------------

// Requirement 1: Root route serving static HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Requirement 2: GET /templates
// Returns a JSON array of 5 poster template objects
app.get('/templates', (req, res) => {
  res.status(200).json(templates);
});

// Requirement 3: POST /design
// Accepts JSON payload with `text` and `templateId`, returns combined design object
app.post('/design', (req, res) => {
  const { text, templateId, backgroundColor, logoUrl } = req.body;

  // Validate presence of text and templateId
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({
      error: "Field 'text' is required and must be a non-empty string."
    });
  }

  if (templateId === undefined || templateId === null) {
    return res.status(400).json({
      error: "Field 'templateId' is required."
    });
  }

  // Find matching template (supports string or numeric ID)
  const template = templates.find((t) => String(t.id) === String(templateId));
  if (!template) {
    return res.status(404).json({
      error: `Template with ID '${templateId}' not found. Available IDs: ${templates.map(t => t.id).join(', ')}`
    });
  }

  // Create new design object
  const designId = `design-${Date.now()}`;
  const newDesign = {
    id: designId,
    text: text.trim(),
    templateId: template.id,
    template: {
      id: template.id,
      name: template.name,
      imageUrl: template.imageUrl
    },
    backgroundColor: backgroundColor || '#ffffff', // Requirement 5 integration
    logoUrl: logoUrl || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Store design
  designs.set(designId, newDesign);

  return res.status(201).json({
    message: "Design created successfully",
    design: newDesign
  });
});

// Requirement 4: POST /upload
// Handles image upload (e.g., logo) via multer, returns file's URL in response
app.post('/upload', handleImageUpload, (req, res) => {
  const file = req.uploadedFile;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${baseUrl}/uploads/${file.filename}`;

  return res.status(200).json({
    message: "Image uploaded successfully",
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    fileUrl: fileUrl
  });
});

// -------------------------------------------------------------
// Requirement 5: AI-Assisted Background Color Selection Feature
// -------------------------------------------------------------
/**
 * Helper function to validate and update background color on a design
 * Adapted from AI-generated code (ChatGPT / GitHub Copilot)
 */
function updateDesignBackgroundColor(design, color) {
  if (!color || typeof color !== 'string') {
    throw new Error("Invalid 'backgroundColor'. Must be a non-empty color string (hex, rgb, or color name).");
  }
  const sanitizedColor = color.trim();
  design.backgroundColor = sanitizedColor;
  design.updatedAt = new Date().toISOString();
  return design;
}

// Dedicated endpoint to update a design's background color
// Supports PATCH and PUT (and POST for maximum client compatibility)
const handleColorUpdate = (req, res) => {
  const { id } = req.params;
  const { backgroundColor } = req.body;

  const design = designs.get(id);
  if (!design) {
    return res.status(404).json({
      error: `Design with ID '${id}' not found.`
    });
  }

  try {
    const updatedDesign = updateDesignBackgroundColor(design, backgroundColor);
    designs.set(id, updatedDesign);
    return res.status(200).json({
      message: "Background color updated successfully",
      design: updatedDesign
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

app.patch('/design/:id/color', handleColorUpdate);
app.put('/design/:id/color', handleColorUpdate);
app.post('/design/:id/color', handleColorUpdate);

// Additional helpful endpoints for fetching designs
app.get('/designs', (req, res) => {
  return res.status(200).json(Array.from(designs.values()));
});

app.get('/design/:id', (req, res) => {
  const design = designs.get(req.params.id);
  if (!design) {
    return res.status(404).json({ error: `Design with ID '${req.params.id}' not found.` });
  }
  return res.status(200).json(design);
});

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`Poster Maker Express Server is running!`);
    console.log(`Local URL: http://localhost:${PORT}`);
    console.log(`Endpoints:`);
    console.log(`- GET    /                 -> Static Canva-like Web UI`);
    console.log(`- GET    /templates        -> 5 Poster Templates`);
    console.log(`- POST   /design           -> Create Design (text + templateId)`);
    console.log(`- POST   /upload           -> Upload Image/Logo (multer)`);
    console.log(`- PATCH  /design/:id/color -> Update Design Background Color`);
    console.log(`- GET    /designs          -> List all created designs`);
    console.log(`- GET    /design/:id       -> Get design by ID`);
    console.log(`===============================================`);
  });
}

module.exports = app;
