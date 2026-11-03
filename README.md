# VOGUEX Atelier — Premium 3D Fashion E-Commerce Platform

![VOGUEX Luxury Fashion](https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85)

> **VOGUEX** is a complete, full-stack, haute couture 3D fashion e-commerce web application inspired by the digital flagships of Zara, Nike, and luxury maisons. It features an interactive WebGL 3D landing hero with realistic lighting, rotating mannequins, dynamic fabric color shaders, interactive 3D product inspection (360° rotation, wireframe, zoom), multi-step checkout, real-time live order tracking via Socket.IO, and a full administrative command portal.

---

## 🌟 Key Architecture & Features

### 1. Immersive 3D WebGL Experiences
- **3D Hero Runway Section**: Built with Three.js and React Three Fiber (`@react-three/fiber` & `@react-three/drei`).
  - Realistic studio spotlights, champagne gold rim lighting, and floating metallic dust particles.
  - Interactive mouse-drag 360° orbit rotation with damped natural sway.
  - **Dynamic Fabric Shader Switcher**: Switch shades in real time (Obsidian Noir, Champagne Gold, Royal Emerald, Pearl White, Bordeaux Velvet).
  - **Interactive 3D Hotspots**: Clickable annotations displaying sartorial tailoring details (Mulberry peak lapels, 18K champagne buttons, floating canvas core).
- **3D Product Viewer**:
  - Interactive procedural 3D models for blazers, evening gowns, sneakers, luxury skeleton watches, and leather handbags.
  - Controls: 360° auto-rotation toggle, zoom in/out, wireframe mode, angle presets (Front, Side, Back, Isometric), and fullscreen inspection.
  - Photography gallery fallback with high-resolution image zoom.

### 2. Full-Stack E-Commerce Capabilities
- **Catalog & Discovery**: Multi-faceted filtering (Department, Gender, Garment Subcategory, Price ceiling, and Sort ordering).
- **Instant Autocomplete Search**: Debounced live search modal with trending searches and instant thumbnail results.
- **Bespoke Product Details**: Size guide calculator based on height and weight, PIN code delivery checker, verified buyer reviews, and "Complete the Look" recommendations.
- **Cart & Bag Engine**: LocalStorage persistence, quantity controls, real-time calculation of taxes, white-glove shipping threshold meter, and promo coupon validation (`VOGUE10`, `GOLD20`, `FIRST50`).
- **Wishlist**: Persistent personal curation with direct "Move to Bag" capability.
- **Multi-Step Checkout**:
  1. Delivery Address management
  2. Order Review & summary
  3. Payment Protocol (Razorpay test mode, Card tokenization, UPI, and Cash on Delivery)
- **Live Order Tracking Radar**:
  - Visual 7-step status timeline (`Order Placed` ➔ `Payment Confirmed` ➔ `Processing` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`).
  - **Real-Time Telemetry via Socket.IO**: Live order updates delivered instantaneously when status is transitioned by an admin.
- **Administrative Command Portal**:
  - Executive financial metrics (Revenue, Orders, Products, VIP Clients).
  - Monthly gross revenue trend charts.
  - Order management table with live status transition dropdown.
  - Product catalog CRUD (Add new creations with 3D model flag, delete, and stock management).
  - Client directory.

---

## 💻 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS, Three.js, React Three Fiber, React Three Drei, Framer Motion, GSAP, Zustand, Axios, Canvas Confetti, Lucide Icons |
| **Backend** | Node.js, Express.js, Socket.IO, MongoDB / Mongoose, JWT, bcryptjs, Razorpay, CORS, Morgan |
| **Styling** | Champagne Gold (`#C6A76B`), Obsidian Black (`#111111`), Off-white (`#F7F6F2`), Glassmorphism |
| **Typography** | Cormorant Garamond (Editorial Serif) & Montserrat (Geometric Sans) |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v18+ (tested on v24)
- **npm** v9+

### 1. Installation

Clone or enter the project root directory:

```bash
cd d:\Ecommerce
```

Install root, client, and server dependencies:

```bash
# In server directory
cd server
npm install

# In client directory
cd ../client
npm install
```

### 2. Environment Configuration

The backend contains a pre-configured `.env` file in `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/voguex
JWT_SECRET=voguex_luxury_fashion_jwt_secret_2026_super_secure
RAZORPAY_KEY_ID=rzp_test_voguex_fashion_key
RAZORPAY_KEY_SECRET=rzp_test_secret_voguex_luxury_2026
CLIENT_URL=http://localhost:5173
```

> **Zero-Setup Resilience:** If an external MongoDB server is not running locally, VOGUEX automatically activates its high-performance in-memory and persistent data store with full CRUD, filtering, pagination, and Socket.IO support!

### 3. Launching Application

You can start both backend and frontend servers:

```bash
# Terminal 1: Backend Server (Port 5000)
cd server
npm start

# Terminal 2: Frontend Vite Development Server (Port 5173)
cd client
npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## 🔑 Demo Access Credentials

| Account Role | Email | Password | Privileges |
|---|---|---|---|
| **Atelier Director (Admin)** | `admin@voguex.com` | `admin123` | Full Admin Dashboard, Order status updater, Product creation |
| **VIP Patron (Client)** | `customer@voguex.com` | `admin123` | Order history, Wishlist, Checkout, Profile management |

*(The login screen also provides one-click autofill buttons for both roles).*

---

## 🎟️ Active Promotional Privilege Codes

- **`VOGUE10`** — 10% discount on all atelier acquisitions over \$100.
- **`GOLD20`** — 20% discount on luxury orders over \$300.
- **`FIRST50`** — \$50 flat welcoming credit on orders over \$250.

---

## 📡 API Reference Overview

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Create new patron account
- `POST /api/auth/login` — Sign in and receive JWT token
- `GET /api/auth/profile` — Get authenticated client profile
- `PUT /api/auth/profile` — Update address book and details

### Products (`/api/products`)
- `GET /api/products` — Filterable catalogue (category, gender, price, sort, pagination)
- `GET /api/products/:id` — Single creation details & 3D model configuration
- `GET /api/products/collections/home` — Aggregated homepage collections
- `GET /api/products/search/autocomplete?q=...` — Instant search suggestions
- `POST /api/products` — *(Admin)* Create product
- `DELETE /api/products/:id` — *(Admin)* Delete product

### Orders & Tracking (`/api/orders`)
- `POST /api/orders` — Securely calculate and place order
- `GET /api/orders/myorders` — Authenticated client orders
- `GET /api/orders/track/:orderId` — Live tracking telemetry & route history
- `PUT /api/orders/:id/cancel` — Cancel pending commission

### Payments (`/api/payments`)
- `POST /api/payments/create-order` — Generate Razorpay test order
- `POST /api/payments/verify` — Server-side HMAC SHA-256 signature verification

### Admin Portal (`/api/admin`)
- `GET /api/admin/dashboard` — Revenue charts, total orders, top products
- `GET /api/admin/orders` — All commissions with status filters
- `PUT /api/admin/orders/:orderId/status` — Update order status (emits live Socket.IO update)
- `GET /api/admin/customers` — VIP customer directory

---

## 🌐 Production Deployment

### Frontend (Vercel / Netlify)
1. Build the production bundle:
   ```bash
   cd client
   npm run build
   ```
2. The optimized build is placed in `client/dist`.
3. Set environment variable `VITE_API_URL` to point to your live backend domain.

### Backend (Render / Railway / AWS)
1. Deploy `server/` with Node.js runtime.
2. Provide `MONGO_URI` (from MongoDB Atlas) and `JWT_SECRET`.
3. Start command: `node server.js`.

---

© 2026 VOGUEX Atelier International. Designed with passion for haute couture & immersive 3D web experiences.

