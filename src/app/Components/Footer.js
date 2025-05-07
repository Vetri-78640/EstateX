'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    setEmail('');
  };

  return (
    <footer className="mt-20 bg-gradient-to-tr from-slate-800 via-slate-900 to-black text-white border-t border-slate-700 shadow-inner relative">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-wide text-slate-100">Real Estate Tracker</h2>
          <p className="text-slate-300">Track investments, analyze trends, and grow your portfolio.</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-md font-semibold text-slate-100">Quick Links</h3>
          <ul className="space-y-1 text-slate-400">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
            <li><a href="#" className="hover:text-white transition">Properties</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-md font-semibold text-slate-100">Stay Updated</h3>
          <p className="text-slate-400">Join our newsletter for updates on market trends and features.</p>
          <form onSubmit={handleSubscribe} className="flex mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md bg-slate-700 text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-sky-500 px-4 py-2 rounded-r-md text-white hover:bg-sky-600 transition"
            >
              Subscribe
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
      </div>

      <div className="text-center py-4 text-slate-500 text-sm border-t border-slate-700 mt-6">
        &copy; {new Date().getFullYear()} Real Estate Tracker. All Rights Reserved.
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50"
          >
            Successfully subscribed!
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}