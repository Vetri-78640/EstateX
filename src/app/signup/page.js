'use client';

import { useAuth } from '@/lib/firebase/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const { user, signInWithGoogle, signUpWithEmail, error } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (user) router.push('/Dashboard');
  }, [user, router]);

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.error('Google signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (password !== confirmPassword) return setPasswordError('Passwords do not match');
    if (password.length < 6) return setPasswordError('Password must be at least 6 characters');

    try {
      setIsLoading(true);
      await signUpWithEmail(email, password);
    } catch (err) {
      console.error('Email signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white/20 to-blue-100/30 dark:from-slate-900 dark:to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white/10 dark:bg-slate-900/30 border border-white/20 backdrop-blur-lg shadow-xl rounded-3xl px-6 py-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {(error || passwordError) && (
          <div className="bg-red-100/80 dark:bg-red-800/30 border border-red-400 text-red-700 dark:text-red-300 rounded-lg p-3 text-sm">
            {error || passwordError}
          </div>
        )}

        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full bg-white/30 dark:bg-slate-800/40 border border-white/30 dark:border-slate-600 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 backdrop-blur-md"
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full bg-white/30 dark:bg-slate-800/40 border border-white/30 dark:border-slate-600 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 backdrop-blur-md"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-full bg-white/30 dark:bg-slate-800/40 border border-white/30 dark:border-slate-600 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 backdrop-blur-md"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-slate-900 px-2 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div>
          <button
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 bg-white/30 dark:bg-slate-800/40 text-blue-700 dark:text-blue-200 border border-blue-400 dark:border-blue-300 rounded-full shadow-md hover:border-blue-500 transition backdrop-blur-md text-sm"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                fill="currentColor"
              />
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}