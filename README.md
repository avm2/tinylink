# 🚀 TinyLink — MERN URL Shortener

TinyLink is a simple and clean **URL shortener application** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It allows users to create short URLs, customize short codes, view stats, and track clicks.

---

## 🌟 Features

### 🔗 URL Shortening
- Convert long URLs into short, shareable links
- Option to create **custom codes** (6–8 characters)
- Auto-generated code if not provided

### 📊 Link Analytics
- Track number of clicks for each link  
- Track last clicked date  
- Per-link detailed stats page  
- Redirect tracking handled on backend

### 🖥 Clean Frontend UI
- Simple and modern dashboard  
- Styled forms and tables  
- Header + footer layout  
- Fully responsive design

### 🧪 Backend API (REST)
- `POST /api/links` → Create new short link  
- `GET /api/links` → List all links  
- `GET /api/links/:code` → Link stats  
- `DELETE /api/links/:code` → Delete link  
- `GET /:code` → Redirect to target + count clicks  
- `GET /healthz` → Health check

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- React Router
- Inline modern CSS (no libraries)
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- CORS + dotenv

---
