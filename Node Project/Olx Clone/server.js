const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware to parse JSON request bodies (Required for POST /add-product)
app.use(express.json());

// Serve static uploaded files if needed
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// =============================================================================
// In-Memory Data Store (Initial OLX Listings)
// =============================================================================
let products = [
  {
    id: 1,
    title: 'iPhone 13 Pro 128GB - Graphite (Mint Condition)',
    price: 48000,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'
  },
  {
    id: 2,
    title: 'Royal Enfield Classic 350 (2022 Model, Single Owner)',
    price: 165000,
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc'
  },
  {
    id: 3,
    title: 'Dell XPS 15 9520 (Intel Core i7, 16GB RAM, 512GB SSD)',
    price: 75000,
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45'
  },
  {
    id: 4,
    title: 'Sony PlayStation 5 Disc Edition + 2 DualSense Controllers',
    price: 42000,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db'
  },
  {
    id: 5,
    title: 'Modern Solid Sheesham Wood Coffee Table',
    price: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88'
  }
];

// =============================================================================
// Route 1: GET /products
// Returns a hardcoded array of product objects in JSON format (similar to OLX feed)
// =============================================================================
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// =============================================================================
// Route 2: POST /add-product
// Accepts product data (title, price, imageUrl) from JSON body and adds to array.
// Responds with the updated list of products.
// =============================================================================
app.post('/add-product', (req, res) => {
  const { title, price, imageUrl } = req.body;

  // Validation
  if (!title || price === undefined || !imageUrl) {
    return res.status(400).json({
      error: 'Missing required fields. Please provide title, price, and imageUrl.'
    });
  }

  // Generate next ID
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    title,
    price: Number(price),
    imageUrl
  };

  products.push(newProduct);

  res.status(201).json({
    message: 'Product added successfully!',
    product: newProduct,
    updatedProducts: products
  });
});

// =============================================================================
// Route 3: GET /products/:id
// Returns details of a single product by id. Returns 404 if not found.
// =============================================================================
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID format. Must be an integer.' });
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: `Product with ID ${productId} not found.` });
  }

  res.status(200).json(product);
});

// =============================================================================
// Route 4: DELETE /products/:id
// Removes a product from the array by id using filter() and returns updated list.
// =============================================================================
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID format. Must be an integer.' });
  }

  const existingProduct = products.find(p => p.id === productId);

  if (!existingProduct) {
    return res.status(404).json({ error: `Product with ID ${productId} not found.` });
  }

  // Remove the item using filter()
  products = products.filter(p => p.id !== productId);

  res.status(200).json({
    message: `Product with ID ${productId} deleted successfully.`,
    updatedProducts: products
  });
});

// =============================================================================
// Route 5 (Bonus/Demo for Question 5): POST /upload-image
// Image upload handling using multer with security validation
// =============================================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate secure randomized filename to prevent overwrites and directory traversal
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only standard image formats
  const allowedExtensions = /jpeg|jpg|png|webp/;
  const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedExtensions.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, PNG, and WEBP image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter
});

app.post('/upload-image', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large! Maximum limit is 5MB.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Please select an image file to upload.' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({
      message: 'Image uploaded successfully!',
      imageUrl,
      filename: req.file.filename
    });
  });
});

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to OLX Clone REST API',
    endpoints: {
      'GET /products': 'Fetch all listings',
      'GET /products/:id': 'Fetch listing details by id',
      'POST /add-product': 'Add a new listing (JSON: { title, price, imageUrl })',
      'DELETE /products/:id': 'Delete a listing by id',
      'POST /upload-image': 'Upload an image file (multipart/form-data field: "image")'
    }
  });
});

// Start the server if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;

