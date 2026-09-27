import { Router } from 'express';
import QRCode from 'qrcode';
import { PAYMENT_CONFIG, buildUpiPaymentUri, parseUpiPaymentUri } from '../config/paymentConfig.js';
import { db } from '../config/firebaseAdmin.js';

const router = Router();

// Get configured ticket passes
router.get('/tiers', (req, res) => {
  res.json({
    success: true,
    data: PAYMENT_CONFIG.PASS_TIERS,
    merchant: {
      name: PAYMENT_CONFIG.MERCHANT_NAME,
      upiId: PAYMENT_CONFIG.MERCHANT_UPI_ID,
      currency: PAYMENT_CONFIG.CURRENCY
    }
  });
});

// Generate UPI QR Code image and URI for a specific tier or custom amount
router.post('/generate-upi', async (req, res, next) => {
  try {
    const { tierId, amount, customNote } = req.body;
    let selectedAmount = PAYMENT_CONFIG.DEFAULT_AMOUNT;
    let tierName = 'SAMYAK 2026 Pass';

    if (tierId) {
      const tier = PAYMENT_CONFIG.PASS_TIERS.find((t) => t.id === tierId);
      if (tier) {
        selectedAmount = tier.price;
        tierName = tier.name;
      }
    } else if (amount) {
      selectedAmount = Number(amount);
    }

    const upiUri = buildUpiPaymentUri({
      pa: PAYMENT_CONFIG.MERCHANT_UPI_ID,
      pn: PAYMENT_CONFIG.MERCHANT_NAME,
      am: selectedAmount,
      cu: PAYMENT_CONFIG.CURRENCY
    });

    const qrDataUrl = await QRCode.toDataURL(upiUri, {
      width: 400,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });

    res.json({
      success: true,
      data: {
        tierName,
        amount: selectedAmount,
        currency: PAYMENT_CONFIG.CURRENCY,
        upiUri,
        qrCode: qrDataUrl,
        instructions: 'Scan with Google Pay, PhonePe, Paytm, or BHIM UPI'
      }
    });
  } catch (error) {
    next(error);
  }
});

// Verify UPI URI compliance
router.post('/verify-uri', (req, res) => {
  const { uri } = req.body;
  const parsed = parseUpiPaymentUri(uri);
  res.json({
    success: parsed.isValid,
    details: parsed
  });
});

export default router;
