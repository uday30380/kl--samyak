/**
 * SAMYAK 2026 - Backend Payment & UPI Configuration
 * Preserved architectural specification
 */

export const PAYMENT_CONFIG = {
  MERCHANT_UPI_ID: 'samyak2026@sbi',
  MERCHANT_NAME: 'SAMYAK 2026',
  CURRENCY: 'INR',
  DEFAULT_AMOUNT: 399,
  PASS_TIERS: [
    {
      id: 'day-pass',
      name: 'Standard Day Pass',
      price: 199,
      description: 'Single day access to technical & non-technical events',
      badge: 'Single Day'
    },
    {
      id: 'full-fest',
      name: 'All-Access Fest Pass',
      price: 399,
      description: 'Full 2-day access to all domains, workshops & pro-shows',
      badge: 'Most Popular'
    },
    {
      id: 'vip-pass',
      name: 'VIP Celebrity Pass',
      price: 799,
      description: 'All-access pass with front-row pro-show arena seating & artist lounge',
      badge: 'VIP Exclusive'
    }
  ]
};

export function buildUpiPaymentUri({ pa, pn, am, cu = 'INR' }) {
  const params = new URLSearchParams();
  params.set('pa', pa);
  params.set('pn', pn);
  if (am !== undefined && am !== null && am !== '') {
    params.set('am', Number(am).toFixed(2));
  }
  params.set('cu', cu);
  return `upi://pay?${params.toString()}`;
}

export function parseUpiPaymentUri(uri) {
  if (!uri || !uri.startsWith('upi://pay?')) {
    return { isValid: false, reason: 'Invalid URI prefix' };
  }
  const queryString = uri.replace('upi://pay?', '');
  const params = new URLSearchParams(queryString);
  return {
    isValid: true,
    pa: params.get('pa'),
    pn: params.get('pn'),
    am: params.get('am'),
    cu: params.get('cu')
  };
}
