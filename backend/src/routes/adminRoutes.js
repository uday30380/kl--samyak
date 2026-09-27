import { Router } from 'express';
import { db, auth } from '../config/firebaseAdmin.js';

const router = Router();

// Middleware to verify Firebase Auth ID token if provided
export async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split('Bearer ')[1];
  if (!auth) {
    return res.status(503).json({ success: false, message: 'Firebase Admin Auth service is not initialized' });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Unauthorized: Invalid token', error: error.message });
  }
}

// System stats route
router.get('/status', async (req, res) => {
  res.json({
    success: true,
    platform: 'SAMYAK 2026 Admin API Gateway',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

export default router;
