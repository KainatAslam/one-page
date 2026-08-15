# 🌿 AURA Botanical — Vue.js Single-Page Storefront with Express & Excel Persistence

A modern, high-aesthetic single-page storefront built with **Vue.js 3**, **Vite**, and a lightweight **Node.js + Express** backend. 

All customer orders and contact form submissions are validated and recorded server-side into persistent Excel files (`orders.xlsx` and `contacts.xlsx`) using `exceljs`. The files accumulate data silently on the server and are never sent to the browser—customers receive clear, instant on-screen confirmation messages.

---

## ✨ Features & Sections

### 1. 🌅 Overview / Hero Landing Section
- Short brand introduction to **AURA Botanical** luxury organic skincare.
- Highlighted **Call-to-Action button** (*"Explore Products"*) with smooth scrolling to the product collection.
- Trust statistics badges (100% Clean Ingredients, 0% Synthetics, 4.9★ Rating).

### 2. 📖 About Us Section
- Narrative detailing organic sourcing, cold-pressed botanical extracts, and eco-friendly dark violet glass packaging.
- Founder quote card and 3 core value pillar cards (*Pure Actives*, *Micro-Batch Integrity*, *Ethical Sustainability*).

### 3. 🛍️ Products Section & Multi-Item Order Modal
- Grid featuring 3 premium products:
  1. **Rosehip Radiance Facial Serum** ($48.00)
  2. **Night Renewal Elixir** ($56.00)
  3. **Botanical Hydrating Mist** ($32.00)
- **Interactive Order Modal**:
  - Multi-product quantity selector with `-` and `+` controls.
  - Real-time order total calculation.
  - **Customer Details Form**: Full Name, Phone, Email, Address, City, Postal Code.
  - Client-side field validation.
  - On submit: sends payload to `/api/orders`, appends a row to `data/orders.xlsx`, and displays an on-screen confirmation message (`ORD-XXXXXX`).

### 4. 📞 Contact Section & Direct Communication
- Contact form with:
  - Radio pills for preferred contact method (**Email**, **Phone**, **WhatsApp**).
  - Dynamic contact detail input.
  - Message description text box.
  - Submit handler sending payload to `/api/contacts`, appending a row to `data/contacts.xlsx`.
- **Direct Highlighted CTAs**:
  - Clickable WhatsApp link: `https://wa.me/15550192834`
  - Clickable Phone Call link: `tel:+15550192834`

### 5. 📊 Server-Side Excel Persistence
- Automatically creates and manages `data/orders.xlsx` and `data/contacts.xlsx`.
- Styled headers and array-based row appending to ensure reliable writes across multiple submissions.

---

## 🛠️ Technology Stack

- **Frontend**: Vue.js 3 (SFCs), Vite, Vanilla CSS with custom HSL design variables, Google Fonts (`Plus Jakarta Sans` & `Playfair Display`).
- **Backend**: Node.js, Express REST API, CORS.
- **Excel Persistence**: `exceljs` library.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd e:/one-page
npm install
```

### 2. Run in Development Mode
Starts both the Express backend API (Port 3000) and the Vite hot-reloading frontend dev server (Port 5173):
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### 3. Run in Production Mode
Builds the optimized frontend bundle and runs a single unified Express server:
```bash
npm run build
npm run start
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📡 API Endpoints

### `POST /api/orders`
Records a customer product order.

**Request Body:**
```json
{
  "items": [
    { "id": "serum", "name": "Rosehip Radiance Facial Serum", "price": 48.00, "quantity": 2 }
  ],
  "totalAmount": 96.00,
  "fullName": "Sarah Jenkins",
  "email": "sarah@example.com",
  "phone": "+1 555-019-2834",
  "address": "742 Evergreen Terrace",
  "city": "Springfield",
  "postalCode": "97477"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": "ORD-752923",
  "timestamp": "8/15/2026, 10:00:05 AM GMT+5"
}
```

---

### `POST /api/contacts`
Records a general contact inquiry.

**Request Body:**
```json
{
  "contactMethod": "email",
  "contactInfo": "sarah@example.com",
  "message": "Do you offer international shipping for bulk orders?"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "MSG-201141",
  "timestamp": "8/15/2026, 9:46:41 AM GMT+5"
}
```

---

## 📁 Excel Storage Location & Schema

All files are stored in the server directory: **`e:/one-page/data/`**

- **`orders.xlsx`** columns:
  `Order ID` | `Timestamp` | `Customer Name` | `Email` | `Phone` | `Address` | `City` | `Postal Code` | `Items Ordered` | `Total Amount ($)`

- **`contacts.xlsx`** columns:
  `Submission ID` | `Timestamp` | `Contact Method` | `Contact Detail` | `Message`

> **Note for Windows Users:** Make sure to close `orders.xlsx` or `contacts.xlsx` in Microsoft Excel while running the server so Windows does not lock file editing permissions.

---

## 📄 License
This project is open-source and available under the MIT License.
