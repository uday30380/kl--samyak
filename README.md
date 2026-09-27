# SAMYAK 2026 — KL Deemed to be University

India's Premier National Level Techno-Management Fest at KL Deemed to be University, Vijayawada.

## 🌟 Overview
SAMYAK 2026 is the annual flagship national fest featuring 45+ technical, cultural, gaming, and management events, flagship workshops, hackathons, and star-studded cultural nights.

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite 8, React Router 7
- **Styling**: Tailwind CSS 4, GSAP (+ ScrollTrigger), Framer Motion, Lenis Smooth Scroll
- **3D Interactive Visuals**: Three.js, React Three Fiber
- **Backend & Data**: Firebase (Firestore, Authentication, Cloud Storage)
- **Image & Asset Delivery**: Cloudflare R2 / ImgBB direct upload pipeline
- **Security & Integrity**: Scoped Firestore Security Rules, Cryptographic QR Gate Scanner, Runtime Integrity Guard

## 🚀 Key Modules
1. **Dynamic Event Arenas**: Live slot counters, department & technical club categories, interactive 3D hero.
2. **Student Registration & Digital Ticketing**: Instant delegate pass generation with cryptographic verification QR.
3. **Multi-Tier Admin Dashboard**:
   - Super Administrator Governance Console & Passcode Provisioning
   - Dedicated Technology Club Portal (Attendance tracking & official university event reporting)
   - Gate Staff QR scanner suite
   - Real-time zero-rebuild Platform Lockdown & Maintenance Gateway

## 👥 Engineering & Architecture
- **Lead Platform Architect**: [Balaram (@balaram753)](https://github.com/balaram753)
- **UI Experience & Engineering**: [Uday Kiran Vempati](https://udaykiranportfolio.web.app/)

## 📁 Monorepo Architecture

The repository is structured into two dedicated directories:
- **`frontend/`**: Complete client application built with React 19, Vite 8, Tailwind CSS 4, Framer Motion, GSAP, and Three.js.
- **`backend/`**: Node.js & Express API server, Firebase Firestore (`firestore.rules`) and Storage (`storage.rules`) security rules, and UPI QR verification tools.

## 💻 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/uday30380/kl--samyak.git

# Install all workspace dependencies
npm install
```

### Running the Project

```bash
# Start frontend client (Vite on http://localhost:5173)
npm run dev
# or:
npm run dev:frontend

# Start backend server (Express on http://localhost:5000)
npm run dev:backend

# Run both frontend and backend concurrently
npm run dev:all

# Production build frontend
npm run build

# Standalone payment verification test
npm --prefix backend run verify:qr
```

---
© 2026 SAMYAK · KL Deemed to be University · All Rights Reserved.
