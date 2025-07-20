import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Using environment variables for security
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCZpltVDLgquCaLZ2lsgEVOwYmkdNQktR4',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'estatex-c39d5.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'estatex-c39d5',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'estatex-c39d5.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '207202007080',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:207202007080:web:fc6c8b0ae93ad79b99dd1d',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-PBRGS54WD3'
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

// Check if we're in the browser and have valid config
const isClient = typeof window !== 'undefined';
const hasValidConfig = firebaseConfig.apiKey && firebaseConfig.projectId;

let app = null;
let auth = null;

if (isClient && hasValidConfig) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log('✅ Firebase initialized successfully');
    console.log('✅ Auth object created:', !!auth);
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
} else if (!isClient) {
  // Server-side: return null to prevent SSR issues
  console.warn('⚠️ Firebase not initialized on server-side');
} else {
  console.error('❌ Firebase configuration is missing required environment variables');
  console.error('Missing variables:', {
    apiKey: !firebaseConfig.apiKey,
    projectId: !firebaseConfig.projectId,
    authDomain: !firebaseConfig.authDomain
  });
}

export { auth };
export default app; 