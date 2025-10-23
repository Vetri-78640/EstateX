'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => { //form logic for email validation which is the strictest email validation ever that I tried to implement//
    e.preventDefault();
    const strictEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const localPart = email.split('@')[0];
    if (
      !strictEmailRegex.test(email) ||
      email.includes('..') ||              
      localPart.endsWith('.') ||            
      localPart.startsWith('.')             
    ) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
    setEmail('');
  };

  return (
    <footer
        style={{ borderRadius: '9999px' }}
             className="mt-20 mb-10 bg-white/20 backdrop-blur-md border border-white/30 text-slate-800 px-6 sm:px-14 py-8 shadow-lg w-[80%] max-w-[1600px] mx-auto rounded-3xl flex flex-col items-center justify-between relative dark:bg-slate-900/60 dark:text-slate-100 dark:border-white/20">
      <div className="w-full flex flex-col md:flex-row gap-6 text-sm md:text-base items-start justify-center gap-x-8">
        <div className="py-2 w-full md:w-auto text-center md:text-left"> {/* Footer Summary*/}
          <h3 className="text-lg max-[425px]:text-[1rem] px-10 sm:px-6 font-semibold tracking-wide text-slate-900 dark:text-white">Real Estate Tracker</h3>
          <p className="text-slate-700 max-[425px]:text-[0.7rem] px-10 sm:px-6 dark:text-slate-300">Track investments, analyze trends, rental income, and grow your portfolio.</p>
        </div>

        <div className="py-2 w-full md:w-auto text-center md:text-left"> {/*Stay updated with our newsletter(subscribe) */}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Stay Updated</h3>
          <p className="text-slate-600 dark:text-slate-300">Join our newsletter for updates on market trends and features.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none border border-slate-200 dark:border-white/20 backdrop-blur rounded-full"
            />
            <button
              type="submit"
              className="btn-glass border border-blue-300 text-blue-700 hover:border-blue-400 hover:text-blue-800 px-4 py-2 rounded-full transition dark:border-blue-200/30 dark:text-blue-100 dark:hover:text-blue-200 w-full sm:w-auto"  style={{ borderRadius: '9999px' }}
            >
              Subscribe
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>

      <div className="text-center py-4 max-[425px]:text-[0.6rem] px-4 sm:px-6 text-slate-600 dark:text-slate-300 text-sm border-t border-white/60 dark:border-white/20 mt-6 bg-transparent rounded-full shadow-lg border-b-2 border-white/30 dark:border-b-2 dark:border-white/20 backdrop-blur-md w-[60%] max-w-md mx-auto">
        &copy; {new Date().getFullYear()} Real Estate Tracker. All Rights Reserved.
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="text-center py-4 max-[425px]:text-[0.6rem] px-4 sm:px-6 text-slate-600 dark:text-slate-300 text-sm border-t border-white/60 dark:border-white/20 mt-6 bg-transparent rounded-full shadow-lg border-b-2 border-white/30 dark:border-b-2 dark:border-white/20 backdrop-blur-md w-[60%] max-w-md mx-auto"
          >
            Successfully subscribed!
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}