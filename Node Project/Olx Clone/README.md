# OLX Clone REST API - Node.js & Express

An Express.js backend implementation for an OLX-style classifieds application featuring product listing, retrieval, addition, deletion, and image upload security practices.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
# Server runs on http://localhost:3000
```

### 3. Run the Automated Test Suite
```bash
node test.js
```

---

## 📌 Route Overview & Documentation

### 1. GET `/products`
- **Description:** Returns the complete list of OLX product listings in JSON format.
- **Method:** `GET`
- **URL:** `http://localhost:3000/products`
- **Sample cURL:**
  ```bash
  curl -X GET http://localhost:3000/products
  ```
- **Sample Response (`200 OK`):**
  ```json
  [
    {
      "id": 1,
      "title": "iPhone 13 Pro 128GB - Graphite (Mint Condition)",
      "price": 48000,
      "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      "id": 2,
      "title": "Royal Enfield Classic 350 (2022 Model, Single Owner)",
      "price": 165000,
      "imageUrl": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc"
    }
  ]
  ```

---

### 2. POST `/add-product`
- **Description:** Accepts a JSON body containing product data (`title`, `price`, `imageUrl`), assigns a unique ID, appends it to the in-memory array, and responds with the updated list.
- **Middleware Used:** `express.json()` to parse incoming JSON payloads.
- **Method:** `POST`
- **URL:** `http://localhost:3000/add-product`
- **Headers:** `Content-Type: application/json`
- **Sample cURL:**
  ```bash
  curl -X POST http://localhost:3000/add-product \
    -H "Content-Type: application/json" \
    -d "{\"title\": \"MacBook Air M2 16GB\", \"price\": 89000, \"imageUrl\": \"https://images.unsplash.com/photo-1517336714731-489689fd1ca8\"}"
  ```
- **Sample Response (`201 Created`):**
  ```json
  {
    "message": "Product added successfully!",
    "product": {
      "id": 6,
      "title": "MacBook Air M2 16GB",
      "price": 89000,
      "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    "updatedProducts": [ ... ]
  }
  ```

---

### 3. GET `/products/:id`
- **Description:** Returns the details of a single listing by its ID.
- **Constraint:** Returns a `404 Not Found` JSON error message if the ID does not exist.
- **Method:** `GET`
- **URL:** `http://localhost:3000/products/1`
- **Sample cURL:**
  ```bash
  curl -X GET http://localhost:3000/products/1
  ```
- **Sample Response (`200 OK`):**
  ```json
  {
    "id": 1,
    "title": "iPhone 13 Pro 128GB - Graphite (Mint Condition)",
    "price": 48000,
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  }
  ```
- **Error Response (`404 Not Found`):**
  ```json
  {
    "error": "Product with ID 999 not found."
  }
  ```

---

### 4. DELETE `/products/:id`
- **Description:** Removes a product from the in-memory array by ID using the JavaScript `filter()` method, and returns the updated product list.
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/products/6`
- **Sample cURL:**
  ```bash
  curl -X DELETE http://localhost:3000/products/6
  ```
- **Sample Response (`200 OK`):**
  ```json
  {
    "message": "Product with ID 6 deleted successfully.",
    "updatedProducts": [ ... ]
  }
  ```

---

## 🛡️ Question 5: AI Code Review & Security Considerations for Image Uploads

### Typical AI-Generated Code (ChatGPT / GitHub Copilot):
```javascript
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.send({ message: 'Uploaded', file: req.file });
});
```

### Review & Security Considerations:

1. **Stripping EXIF Metadata (Crucial for an OLX Classifieds App)**:
   - When users take photos of items from smartphones, modern cameras embed **EXIF metadata** containing exact GPS coordinates (latitude & longitude) and camera timestamps.
   - In a classified marketplace like OLX, exposing raw images allows malicious users to extract the seller's exact home address.
   - **Solution:** Process uploaded images with a library like `sharp` to strip all EXIF metadata and re-encode the image buffer before public display.

2. **MIME-Type & Magic Byte Validation (Preventing Remote Code Execution)**:
   - AI code often trusts `file.originalname` or the client-supplied `file.mimetype`. Attackers can upload an executable file (`backdoor.php`, `exploit.sh`, or `.exe`) disguised with a `.jpg` extension or spoofed headers.
   - **Solution:** Inspect the binary magic bytes (file signature) using libraries like `file-type` or `sharp` rather than relying solely on file extensions or HTTP headers.

3. **Storage Scalability & File Overwriting**:
   - Storing files in a local `uploads/` directory fails in production when multiple server instances run behind a load balancer. Additionally, using `file.originalname` risks path traversal vulnerabilities (`../../`).
   - **Solution:** Generate secure randomized UUID filenames and upload images directly to cloud object storage (e.g., AWS S3, Cloudinary, or Google Cloud Storage) via pre-signed URLs or streams.

