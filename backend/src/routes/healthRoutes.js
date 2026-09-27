import { Router } from 'express';
import { isFirebaseInitialized } from '../config/firebaseAdmin.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'SAMYAK 2026 API Server',
    timestamp: new Date().toISOString(),
    firebaseAdminConnected: isFirebaseInitialized(),
    uptime: Math.floor(process.uptime())
  });
});

export default router;
