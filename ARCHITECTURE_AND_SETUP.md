# AURA Botanical — Architecture & Setup Documentation

A lightweight, high-aesthetic single-page storefront built with **Vue.js 3** and **Node.js + Express**. All order and contact form submissions are validated and recorded server-side into persistent Excel files (`orders.xlsx` and `contacts.xlsx`) using `exceljs`.

---

## 🏗️ System Architecture Overview

```
                          ┌─────────────────────────────────────────┐
                          │            BROWSER CLIENT               │
                          │   Vue.js 3 SPA (Single Page App)        │
                          └────────────────────┬────────────────────┘
                                               │
                                 HTTP REST API Requests (JSON)
                                               │
                                               ▼
                          ┌─────────────────────────────────────────┐
                          │            NODE.JS SERVER               │
                          │      Express REST API (Port 3000)       │
                          └────────────────────┬────────────────────┘
                                               │
                                       ExcelJS File I/O
                                               │
                                               ▼
                          ┌─────────────────────────────────────────┐
                          │           SERVER STORAGE                │
                          │   e:/one-page/data/orders.xlsx          │
                          │   e:/one-page/data/contacts.xlsx        │
                          └─────────────────────────────────────────┘
```

---

## 🎨 1. Frontend Architecture (`/src`)

The frontend is a single-page Vue 3 application styled with modern vanilla CSS using design system tokens (glassmorphism, micro-animations, Google Fonts).

### Component Hierarchy

- **`index.html`** — HTML5 entry file with SEO meta tags, OpenGraph descriptions, and Google Fonts (`Plus Jakarta Sans` & `Playfair Display`).
- **`src/main.js`** — Vue application entry point.
- **`src/App.vue`** — Parent shell managing product data state, modal visibility, active product selection, and global layout.
- **`src/assets/main.css`** — Design tokens (HSL colors, typography, glassmorphism card definitions, button primitives).

#### Section Components:
1. **`Navbar.vue`**
   - Sticky blur navbar with brand logo (`AURA Botanical`).
   - Smooth anchor navigation links (`#hero`, `#about`, `#products`, `#contact`).
   - Highlighted header CTA button (*"Order Now"*) triggering the modal dialog.

2. **`HeroSection.vue`** (Overview / Landing)
   - Hero headline, sub-headline, trust statistics, floating feature badges.
   - Primary Call-to-Action (*"Explore Products"*) scrolling directly to `#products`.

3. **`AboutSection.vue`**
   - Narrative on organic ingredient sourcing, micro-batch philosophy, and sustainability.
   - Visual founder quote card and 3 core pillar tiles.

4. **`ProductsSection.vue`**
   - Displays 3 handcrafted product cards (*Rosehip Radiance Serum*, *Night Renewal Elixir*, *Botanical Hydrating Mist*).
   - Clicking any product passes the item ID to open the **ProductModal**.
   - Custom bundle CTA banner.

5. **`ProductModal.vue`** (Order Modal & Details Form)
   - Lists all 3 products with quantity increment/decrement (`-` / `+`) buttons.
   - Computes total price dynamically.
   - **Customer Details Form**: Full Name, Phone, Email, Street Address, City, Postal Code.
   - Client-side validation: verifies required fields & email pattern.
   - `POST /api/orders` submission handler displaying an on-screen confirmation message with Order ID (`ORD-XXXXXX`).

6. **`ContactSection.vue`**
   - Interactive form with preferred contact method selector (Email / Phone / WhatsApp) and inquiry textarea.
   - `POST /api/contact` submission handler displaying an on-screen confirmation message with Reference ID (`MSG-XXXXXX`).
   - Highlighted direct communication CTA buttons:
     - **WhatsApp**: `https://wa.me/15550192834`
     - **Phone Call**: `tel:+15550192834`

---

## ⚡ 2. Backend Architecture (`/server`)

The backend is built with **Node.js** and **Express**, responsible for hosting API endpoints and managing Excel file I/O.

### Key Backend Files

- **`server/index.js`**
  - Configures Express app, CORS middleware, and JSON parser.
  - Exposes REST endpoints:
    - `POST /api/orders` — Receives customer & order details, invokes `saveOrder()`.
    - `POST /api/contact` — Receives contact inquiry details, invokes `saveContact()`.
  - Serves static compiled frontend files from `dist/` in production mode.

- **`server/excelService.js`**
  - Utilizes `exceljs` to manage spreadsheet file persistence.
  - Automatically initializes `data/orders.xlsx` and `data/contacts.xlsx` with styled header rows if they don't exist.
  - Uses array-based row insertion (`sheet.addRow([ ... ])`) to guarantee reliable data writing across multiple submissions.

---

## 📁 3. Persistent Server Data Structure

All user submissions land silently in the server data directory: `e:/one-page/data/`

### `orders.xlsx` Sheet Schema
| Column Index | Column Header | Data Type | Example Value |
| :--- | :--- | :--- | :--- |
| **Col 1** | Order ID | String | `ORD-005023` |
| **Col 2** | Timestamp | String | `8/15/2026, 10:00:05 AM GMT+5` |
| **Col 3** | Customer Name | String | `Alice Johnson` |
| **Col 4** | Email | String | `alice@example.com` |
| **Col 5** | Phone | String | `+1 555-987-6543` |
| **Col 6** | Address | String | `456 Sunset Blvd` |
| **Col 7** | City | String | `Los Angeles` |
| **Col 8** | Postal Code | String | `90028` |
| **Col 9** | Items Ordered | String | `Night Renewal Elixir (x1) - $56.00` |
| **Col 10** | Total Amount ($) | String | `$56.00` |

### `contacts.xlsx` Sheet Schema
| Column Index | Column Header | Data Type | Example Value |
| :--- | :--- | :--- | :--- |
| **Col 1** | Submission ID | String | `MSG-201141` |
| **Col 2** | Timestamp | String | `8/15/2026, 9:46:41 AM GMT+5` |
| **Col 3** | Contact Method | String | `email` |
| **Col 4** | Contact Detail | String | `alice@example.com` |
| **Col 5** | Message | String | `Hi! Do you offer bulk orders?` |

---

## 💻 4. How to Run the Application

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

### Option A: Development Mode (Recommended for testing)

Runs both the Express backend API and the Vite hot-reloading dev server simultaneously using `concurrently`.

```bash
# 1. Navigate to project root
cd e:/one-page

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development servers
npm run dev
```

- **Frontend App**: Open [http://localhost:5173](http://localhost:5173) in your browser.
- **Backend API**: Running on [http://localhost:3000](http://localhost:3000) (Vite proxies `/api` calls automatically).

---

### Option B: Production Mode (Single Unified Server)

Builds the optimized frontend bundle into `dist/` and serves both the web app and API endpoints from a single Express server on port 3000.

```bash
# 1. Build frontend bundle
npm run build

# 2. Start single production server
npm run start
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Option C: Running Backend and Frontend Separately

If you prefer two terminal windows:

**Terminal 1 (Backend API):**
```bash
npm run dev:backend
```

**Terminal 2 (Frontend Dev Server):**
```bash
npm run dev:frontend
```

---

## ⚠️ Important Note on Excel File Viewing (Windows)

When testing submissions:
1. Make sure `orders.xlsx` or `contacts.xlsx` is **closed** in Microsoft Excel before placing test orders in the browser.
2. Windows locks open `.xlsx` files exclusively; closing Excel allows Node.js to write new rows instantly.
3. Re-open `e:/one-page/data/orders.xlsx` anytime to view all accumulated orders.
