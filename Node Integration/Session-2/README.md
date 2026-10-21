# Session 2: Web Development API Tasks Assignment with Postman

This project contains the complete setup, step-by-step documentation, and exported Postman collection for the **Session-2 Node Integration Assignment**.

---

## 📁 Artifacts in This Directory

| File | Description |
|------|-------------|
| [`FoodieApp APIs.postman_collection.json`](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-2/FoodieApp%20APIs.postman_collection.json) | Exported Postman Collection (v2.1) ready for import and peer review |
| [`FoodieApp_APIs.postman_collection.json`](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-2/FoodieApp_APIs.postman_collection.json) | Identical collection copy with standard filename for CLI / web sharing |
| [`README.md`](file:///d:/TOPS%20All%20FILES/All%20Assignment/Node%20Integration/Session-2/README.md) | Complete step-by-step submission guide and verification |

---

## Task-by-Task Implementation & Verification Guide

### 1. Postman Installation & Collection Creation
- **Installation Status**: Postman is **already installed** on your system:
  - Location: `C:\Users\MOHIT PAREKH\AppData\Local\Postman\app-12.30.0\Postman.exe`
- **To Launch Postman**:
  - Press `Win + S`, type `Postman`, and press `Enter`.
  - Or run in PowerShell:
    ```powershell
    Start-Process "$env:LOCALAPPDATA\Postman\Postman.exe"
    ```
- **Create Collection**:
  1. In the left sidebar of Postman, click on **Collections**.
  2. Click the **`+`** (Create new collection) icon.
  3. Rename the collection to **`FoodieApp APIs`**.
  4. (Optional) Add collection description: `Collection of API requests for FoodieApp to manage posts, users, and food updates.`

---

### 2. Testing GET Request
- **Endpoint**: `GET https://jsonplaceholder.typicode.com/posts`
- **Steps in Postman**:
  1. Click the **`+`** tab to open a new request tab.
  2. Ensure the HTTP method dropdown is set to **`GET`**.
  3. Enter the URL: `https://jsonplaceholder.typicode.com/posts`
  4. Click the blue **Send** button.
- **Verification**:
  - **Status Code**: `200 OK`
  - **Body Tab**: Contains a JSON array with 100 post items.
  - Sample snippet:
    ```json
    [
      {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    ]
    ```

---

### 3. Testing POST Request with JSON Body
- **Endpoint**: `POST https://jsonplaceholder.typicode.com/users`
- **Steps in Postman**:
  1. Click **`+`** to open a new request tab.
  2. Change the method dropdown from `GET` to **`POST`**.
  3. Enter the URL: `https://jsonplaceholder.typicode.com/users`
  4. Below the URL bar, click the **Body** tab.
  5. Select the **`raw`** radio button and change the dropdown from `Text` to **`JSON`**.
  6. In the text area, input:
     ```json
     {
       "name": "Mohit Parekh",
       "email": "mohit.parekh@example.com"
     }
     ```
  7. Click the blue **Send** button.
- **Verification**:
  - **Status Code**: `201 Created`
  - **Body Tab**: The response returns your sent name, email, plus a newly generated `id`:
    ```json
    {
      "name": "Mohit Parekh",
      "email": "mohit.parekh@example.com",
      "id": 11
    }
    ```

---

### 4. Saving Requests to 'FoodieApp APIs' Collection with Descriptions

Four requests (GET, POST, PUT, DELETE) have been configured with detailed descriptions and automated test scripts:

#### Request 1: `GET - Fetch All Posts`
- **Method & URL**: `GET https://jsonplaceholder.typicode.com/posts`
- **Description**: *Retrieves an array of all posts from the server. Used in FoodieApp to display feed, community food reviews, and announcements. Expected response: HTTP 200 OK with a JSON array of post objects.*
- **To Save**: Click **Save**, set name to `GET - Fetch All Posts`, select collection `FoodieApp APIs`, and click **Save**.

#### Request 2: `POST - Create New User`
- **Method & URL**: `POST https://jsonplaceholder.typicode.com/users`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "name": "Mohit Parekh",
    "email": "mohit.parekh@example.com"
  }
  ```
- **Description**: *Creates a new foodie user profile by sending name and email fields in JSON format. Used in FoodieApp for onboarding new users. Expected response: HTTP 201 Created returning the sent payload along with a unique user ID.*
- **To Save**: Click **Save**, name as `POST - Create New User`, select `FoodieApp APIs`, and click **Save**.

#### Request 3: `PUT - Update User Details`
- **Method & URL**: `PUT https://jsonplaceholder.typicode.com/users/1`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "name": "Mohit Parekh (Updated)",
    "email": "mohit.updated@example.com"
  }
  ```
- **Description**: *Updates existing user information (name and email) for user ID 1. Used in FoodieApp when a user edits their account profile. Expected response: HTTP 200 OK returning the modified profile data.*
- **To Save**: Click **Save**, name as `PUT - Update User Details`, select `FoodieApp APIs`, and click **Save**.

#### Request 4: `DELETE - Delete Post by ID`
- **Method & URL**: `DELETE https://jsonplaceholder.typicode.com/posts/1`
- **Description**: *Deletes a post or review by ID from the database. Used in FoodieApp when a user removes their review or food item. Expected response: HTTP 200 OK confirming deletion.*
- **To Save**: Click **Save**, name as `DELETE - Delete Post by ID`, select `FoodieApp APIs`, and click **Save**.

---

### 5. Exporting and Sharing the Collection
- **Steps to Export from Postman**:
  1. In the left sidebar, hover over **FoodieApp APIs** collection.
  2. Click the three dots (**`...`**) next to the collection name.
  3. Scroll down and click **Export**.
  4. Choose **Collection v2.1 (recommended)**.
  5. Click **Export** and save the file in your project folder as `FoodieApp APIs.postman_collection.json`.
- **Peer Review & Importing**:
  - Your peer / classmate can import this file by clicking the **Import** button in Postman (top-left) and dragging the JSON file into Postman.
