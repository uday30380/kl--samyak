import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let adminInitialized = false;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    adminInitialized = true;
    console.log('[FirebaseAdmin] Initialized via FIREBASE_SERVICE_ACCOUNT_KEY env');
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    adminInitialized = true;
    console.log('[FirebaseAdmin] Initialized via discrete credentials');
  } else {
    // Fallback initialize without explicit service account (for Cloud Run / GCP environments)
    if (admin.apps.length === 0) {
      admin.initializeApp();
      adminInitialized = true;
      console.log('[FirebaseAdmin] Initialized with application default credentials');
    }
  }
} catch (error) {
  console.warn('[FirebaseAdmin] Notice: Running in standalone mode without active Firebase Admin credentials:', error.message);
}

export const db = adminInitialized ? admin.firestore() : null;
export const auth = adminInitialized ? admin.auth() : null;
export const storage = adminInitialized ? admin.storage() : null;
export const isFirebaseInitialized = () => adminInitialized;
export default admin;
