# Shop Backend API

A complete Node.js and Express.js backend project fulfilling all 5 requested features.

---

## 📁 Project Structure

```
shop-backend/
├── package.json        # Project metadata and dependencies (Express)
├── server.js          # Main Express application implementing all 5 tasks
├── test.js            # Automated test suite verifying all tasks
└── README.md          # Documentation and API endpoints guide
```

---

## 🚀 How to Run the Server

1. Open your terminal and navigate to the project directory:
   ```bash
   cd shop-backend
   ```
2. Start the Express server:
   ```bash
   npm start
   ```
   Or run in development watch mode:
   ```bash
   npm run dev
   ```

3. Run the automated tests:
   ```bash
   npm test
   ```

The server will start on `http://localhost:3000`.

---

## 📌 Implementation Details for Each Task

### 1. Basic Express Server & `/products` Route
- **File:** [`server.js`](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Project/E-%20commerce%20website/shop-backend/server.js)
- **Endpoint:** `GET /products`
- **Response:** JSON array with 3 sample products:
  ```json
  [
    { "id": 1, "name": "Wireless Bluetooth Headphones", "price": 1999 },
    { "id": 2, "name": "Smart Fitness Watch", "price": 2499 },
    { "id": 3, "name": "Mechanical Gaming Keyboard", "price": 3499 }
  ]
  ```

---

### 2. `addToCart(productId, quantity)` Function
- **Function definition:**
  ```javascript
  function addToCart(productId, quantity = 1)
  ```
- **Cart representation:** An in-memory array `cart = []`.
- **Logic:** Checks if the product already exists using `.findIndex()`.
  - If existing: increases `item.quantity += quantity`.
  - If new: pushes `{ productId, name, price, quantity }` to `cart`.
- **API Endpoint:** `POST /cart/add`
  - Body: `{ "productId": 1, "quantity": 2 }`

---

### 3. Zomato-Style Bill Endpoint (`/cart/total`)
- **Endpoint:** `GET /cart/total`
- **Formula:**
  - `itemTotal` = $\sum (\text{item.price} \times \text{item.quantity})$
  - `deliveryCharge` = $5\%$ of `itemTotal`
  - `grandTotal` = `itemTotal + deliveryCharge`
- **Sample Output:**
  ```json
  {
    "cartItems": [ ... ],
    "billBreakdown": {
      "itemTotal": 12494,
      "deliveryChargeRate": "5%",
      "deliveryCharge": 624.7,
      "grandTotal": 13118.7
    },
    "formattedBill": {
      "Item Total": "₹12494.00",
      "Delivery Partner Fee (5%)": "₹624.70",
      "To Pay": "₹13118.70"
    }
  }
  ```

---

### 4. Flipkart-Style Product Search (`/products/search`)
- **Endpoint:** `GET /products/search?q=<keyword>`
- **Logic:** Performs case-insensitive matching (`.toLowerCase().includes(...)`) against product names.
- **Example:**
  - `GET /products/search?q=watch` returns the "Smart Fitness Watch".
  - `GET /products/search?q=KEYBOARD` returns the "Mechanical Gaming Keyboard".

---

### 5. Request Logging Middleware
- **Middleware:**
  ```javascript
  const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
    next();
  };

  app.use(loggerMiddleware);
  ```
- Every incoming HTTP request method and URL is printed in the terminal console in real-time.

