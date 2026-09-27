# SAMYAK 2026 — Backend

Backend services, API gateways, offline scripts, and Firebase configuration for the SAMYAK 2026 fest platform.

## Architecture

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database & Storage Rules**: Firebase Firestore (`firestore.rules`) & Firebase Storage (`storage.rules`)
- **Admin SDK**: `firebase-admin` (optional server credentials with graceful offline fallback)
- **Utilities**: QR Code generation & UPI parsing (`qrcode`, `jsqr`, `pngjs`)

## Directory Structure

```
backend/
├── .env.example              # Environment variables template
├── firestore.rules           # Security rules for Cloud Firestore
├── storage.rules             # Security rules for Firebase Storage
├── package.json              # Backend dependencies and scripts
├── scripts/
│   └── verify_payment_qr.mjs # Offline UPI QR verification test script
└── src/
    ├── server.js             # Express API application entrypoint
    ├── config/
    │   ├── firebaseAdmin.js  # Firebase Admin SDK initialization
    │   └── paymentConfig.js  # Payment and UPI standards configuration
    ├── middleware/
    │   └── errorHandler.js   # Error and 404 middleware
    └── routes/
        ├── healthRoutes.js   # GET /api/health
        ├── eventRoutes.js    # GET /api/events, /api/events/:id
        ├── paymentRoutes.js  # UPI generation and validation endpoints
        └── adminRoutes.js    # Protected administrative endpoints
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env` and fill in any credentials:
```bash
cp .env.example .env
```

### 3. Run the Backend API Server
Development mode (auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Default server URL: `http://localhost:5000`

### 4. Verify Payment QR Integration
Run the standalone UPI QR validator:
```bash
npm run verify:qr
```
