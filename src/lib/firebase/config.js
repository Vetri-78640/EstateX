import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace this with your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCZpltVDLgquCaLZ2lsgEVOwYmkdNQktR4",
  authDomain: "estatex-c39d5.firebaseapp.com",
  projectId: "estatex-c39d5",
  storageBucket: "estatex-c39d5.firebasestorage.app",
  messagingSenderId: "207202007080",
  appId: "1:207202007080:web:fc6c8b0ae93ad79b99dd1d",
  measurementId: "G-PBRGS54WD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app; 