'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from './config';
import { usePathname, useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log('AuthContext: Firebase auth available?', !!auth);
    console.log('AuthContext: Environment variables check:', {
      apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    });
    
    if (!auth) {
      console.warn('Firebase auth not available');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AuthContext: Auth state changed:', !!user);
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Redirect to root if not logged in and not on root or auth pages
  useEffect(() => {
    if (!loading && !user) {
      const allowed = ['/', '/login', '/signup'];
      if (!allowed.includes(pathname)) {
        router.replace('/');
      }
    }
  }, [user, loading, pathname, router]);

  const signInWithGoogle = async () => {
    console.log('🔍 signInWithGoogle called');
    console.log('🔍 Auth object available:', !!auth);
    
    if (!auth) {
      console.error('❌ Firebase auth not available');
      throw new Error('Firebase auth not available');
    }
    
    try {
      setError(null);
      console.log('🔍 Creating Google provider...');
      const provider = new GoogleAuthProvider();
      console.log('🔍 Calling signInWithPopup...');
      const result = await signInWithPopup(auth, provider);
      console.log('✅ Google sign-in successful:', result.user.email);
      return result.user;
    } catch (error) {
      console.error('❌ Google sign-in error:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error message:', error.message);
      setError(error.message);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password) => {
    console.log('🔍 signUpWithEmail called');
    console.log('🔍 Auth object available:', !!auth);
    
    if (!auth) {
      console.error('❌ Firebase auth not available');
      throw new Error('Firebase auth not available');
    }
    
    try {
      setError(null);
      console.log('🔍 Calling createUserWithEmailAndPassword...');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ Email sign-up successful:', result.user.email);
      return result.user;
    } catch (error) {
      console.error('❌ Email sign-up error:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error message:', error.message);
      setError(error.message);
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    console.log('🔍 signInWithEmail called');
    console.log('🔍 Auth object available:', !!auth);
    
    if (!auth) {
      console.error('❌ Firebase auth not available');
      throw new Error('Firebase auth not available');
    }
    
    try {
      setError(null);
      console.log('🔍 Calling signInWithEmailAndPassword...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Email sign-in successful:', result.user.email);
      return result.user;
    } catch (error) {
      console.error('❌ Email sign-in error:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error message:', error.message);
      setError(error.message);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    if (!auth) {
      throw new Error('Firebase auth not available');
    }
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) {
      throw new Error('Firebase auth not available');
    }
    try {
      setError(null);
      await new Promise((res) => setTimeout(res, 1200));
      
      // Don't clear user data - preserve it for when they log back in
      console.log('User logged out, data preserved for:', user?.uid);
      
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // After logout, always redirect to root
  const logoutAndRedirect = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signInWithGoogle, 
      signUpWithEmail,
      signInWithEmail,
      resetPassword,
      logout: logoutAndRedirect, 
      loading,
      error 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}; 