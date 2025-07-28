import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Debug logging
console.log('Firebase Config Debug:', {
  apiKey: firebaseConfig.apiKey ? 'SET' : 'MISSING',
  authDomain: firebaseConfig.authDomain ? 'SET' : 'MISSING',
  projectId: firebaseConfig.projectId ? 'SET' : 'MISSING',
  storageBucket: firebaseConfig.storageBucket ? 'SET' : 'MISSING',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'SET' : 'MISSING',
  appId: firebaseConfig.appId ? 'SET' : 'MISSING',
  measurementId: firebaseConfig.measurementId ? 'SET' : 'MISSING',
  isClient: typeof window !== 'undefined',
  currentDomain: typeof window !== 'undefined' ? window.location.hostname : 'server'
});

const isClient = typeof window !== 'undefined';
const hasValidConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

let app = null;
let auth = null;
console.log('Firebase Config Debug:', {
  apiKey: firebaseConfig.apiKey ? 'SET' : 'MISSING',
  authDomain: firebaseConfig.authDomain ? 'SET' : 'MISSING',
  projectId: firebaseConfig.projectId ? 'SET' : 'MISSING',
  // ...
});

if (isClient && hasValidConfig) {
  try {
    // ✅ Prevent re-initialization
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);

    console.log('✅ Firebase initialized successfully');
    console.log('✅ Auth object created:', !!auth);
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
} else if (!isClient) {
  console.warn('⚠️ Firebase not initialized on server-side');
} else {
  console.error('❌ Firebase config missing required env variables');
}

export { auth };
export default app;