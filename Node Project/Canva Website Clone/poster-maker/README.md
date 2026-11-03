# 🎨 Canva Poster Maker (Node.js & Express)

A Canva-inspired poster creator web application and REST API built with Node.js, Express, and Multer.

---

## 🚀 Features & Completed Requirements

1. **Project Setup & Express Static Server:**
   - Initialized `poster-maker` with npm and installed `express` and `multer`.
   - Root route `GET /` serves a Canva-styled interactive single-page application from the `public/` directory.

2. **Template Catalog API (`GET /templates`):**
   - Returns a JSON array of 5 poster templates, each with `id`, `name`, and `imageUrl`.

3. **Design Creation API (`POST /design`):**
   - Accepts a JSON payload containing `text` and `templateId`.
   - Validates inputs and returns a new design object combining user text with the selected template metadata.

4. **Image / Logo Upload via Multer (`POST /upload`):**
   - Configured Multer disk storage in the `uploads/` folder.
   - Accepts image uploads (PNG, JPG, SVG, WEBP up to 5MB) and returns the public URL `fileUrl`.
   - Serves uploaded assets statically via `/uploads`.

5. **AI-Assisted Background Color Feature (`PATCH /design/:id/color`):**
   - Designed using AI prompt generation (ChatGPT / GitHub Copilot pattern).
   - Validates color codes and updates the design object in the in-memory store.
   - Includes real-time color swatches and color picker in the web UI.

---

## 📁 Project Structure

```
poster-maker/
├── package.json          # Dependencies (express, multer) & scripts
├── server.js             # Express server, REST endpoints & Multer setup
├── test-api.js           # Automated end-to-end test suite
├── uploads/              # Static directory for uploaded user logos/images
│   └── .gitkeep
├── public/               # Client-side Canva-like Web UI
│   ├── index.html        # Main HTML layout & interactive artboard
│   ├── style.css         # Modern Canva dark theme styles
│   └── app.js            # Frontend logic & API inspector
└── README.md             # Complete documentation & API guide
```

---

## 🛠️ Installation & Getting Started

### 1. Install Dependencies
```bash
cd poster-maker
npm install
```

### 2. Start the Server
```bash
npm start
```
The server will start at: `http://localhost:3000`

### 3. Run Automated Tests
```bash
npm test
```
Runs `test-api.js` testing all 5 endpoints.

---

## 📡 API Endpoint Reference

### 1. Serve Static Frontend
- **Route:** `GET /`
- **Description:** Serves the interactive Canva-like poster creation UI.

---

### 2. Get Poster Templates
- **Route:** `GET /templates`
- **Method:** `GET`
- **Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Neon Music Festival",
    "imageUrl": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": 2,
    "name": "Tech Innovation Summit",
    "imageUrl": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": 3,
    "name": "Tropical Summer Beach Party",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": 4,
    "name": "Minimalist Modern Art Expo",
    "imageUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": 5,
    "name": "Fitness & Marathon Challenge",
    "imageUrl": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
  }
]
```

---

### 3. Create a Design
- **Route:** `POST /design`
- **Headers:** `Content-Type: application/json`
- **Payload:**
```json
{
  "text": "Summer Vibes Tour 2026",
  "templateId": 1,
  "backgroundColor": "#121826"
}
```
- **Response (201 Created):**
```json
{
  "message": "Design created successfully",
  "design": {
    "id": "design-1793688557210",
    "text": "Summer Vibes Tour 2026",
    "templateId": 1,
    "template": {
      "id": 1,
      "name": "Neon Music Festival",
      "imageUrl": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
    },
    "backgroundColor": "#121826",
    "logoUrl": null,
    "createdAt": "2026-11-03T06:49:17.210Z",
    "updatedAt": "2026-11-03T06:49:17.210Z"
  }
}
```

---

### 4. Upload Image / Logo (Multer)
- **Route:** `POST /upload`
- **Headers:** `multipart/form-data`
- **Form Field:** `image` or `logo`
- **Response (200 OK):**
```json
{
  "message": "Image uploaded successfully",
  "filename": "brand-logo-1793688557221-998397327.png",
  "originalName": "brand-logo.png",
  "mimetype": "image/png",
  "size": 68,
  "fileUrl": "http://localhost:3000/uploads/brand-logo-1793688557221-998397327.png"
}
```

---

### 5. Update Background Color (AI-Assisted Feature)
- **Route:** `PATCH /design/:id/color` (also supports `PUT` and `POST`)
- **Headers:** `Content-Type: application/json`
- **Payload:**
```json
{
  "backgroundColor": "#7D2AE8"
}
```
- **Response (200 OK):**
```json
{
  "message": "Background color updated successfully",
  "design": {
    "id": "design-1793688557210",
    "text": "Summer Vibes Tour 2026",
    "templateId": 1,
    "template": {
      "id": 1,
      "name": "Neon Music Festival",
      "imageUrl": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
    },
    "backgroundColor": "#7D2AE8",
    "logoUrl": null,
    "createdAt": "2026-11-03T06:49:17.210Z",
    "updatedAt": "2026-11-03T06:49:17.227Z"
  }
}
```

---

## 🤖 Requirement 5: AI Prompt & Integration Details

### 1. Prompt Used:
> *"I am building a Canva-like poster maker Express application. Write a simple Express route and helper function that allows users to select or update a background color for an existing design object by its ID. It should validate the color string and return the updated design object."*

### 2. Sample Code Generated by AI:
```javascript
// AI-generated starter code
app.patch('/design/:id/color', (req, res) => {
  const { id } = req.params;
  const { backgroundColor } = req.body;

  if (!backgroundColor || typeof backgroundColor !== 'string') {
    return res.status(400).json({ error: 'Valid backgroundColor string is required' });
  }

  const design = designs.get(id);
  if (!design) {
    return res.status(404).json({ error: 'Design not found' });
  }

  design.backgroundColor = backgroundColor.trim();
  design.updatedAt = new Date().toISOString();

  return res.json({
    message: 'Background color updated successfully',
    design
  });
});
```

### 3. Adaptation & Project Integration:
- Encapsulated color update logic into a reusable helper `updateDesignBackgroundColor(design, color)`.
- Added multi-method routing (`PATCH`, `PUT`, `POST`) on `/design/:id/color` for seamless client compatibility.
- Linked background color directly into the initial `POST /design` creation endpoint with default `#ffffff`.
- Integrated real-time color swatches and color picker into the HTML5 artboard preview in `public/index.html`.

---

## 🧪 Testing with cURL

```bash
# 1. Fetch templates
curl -X GET http://localhost:3000/templates

# 2. Create a new design
curl -X POST http://localhost:3000/design \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"Gala Night 2026\",\"templateId\":1}"

# 3. Upload a logo
curl -X POST http://localhost:3000/upload \
  -F "image=@my-logo.png"

# 4. Update background color of a design
curl -X PATCH http://localhost:3000/design/YOUR_DESIGN_ID/color \
  -H "Content-Type: application/json" \
  -d "{\"backgroundColor\":\"#00C4CC\"}"
```

