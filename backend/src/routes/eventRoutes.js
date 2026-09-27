import { Router } from 'express';
import { db } from '../config/firebaseAdmin.js';

const router = Router();

// Get all events
router.get('/', async (req, res, next) => {
  try {
    if (!db) {
      return res.json({
        success: true,
        source: 'local-stub',
        message: 'Firebase Admin not configured. Returning empty roster or configure credentials in .env',
        events: []
      });
    }

    const snapshot = await db.collection('events').get();
    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    next(error);
  }
});

// Get event by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!db) {
      return res.status(404).json({ success: false, message: 'Event not found (Firebase not configured)' });
    }

    const doc = await db.collection('events').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, event: { id: doc.id, ...doc.data() } });
  } catch (error) {
    next(error);
  }
});

export default router;
