'use client';

import { useEffect, useState } from 'react';
import PropertyCardsGrid from '../Components/PropertyCard';
import { motion } from 'framer-motion';

export default function Properties() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('https://dummyjson.com/c/4269-8fc8-497a-aa92')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data', err);
        setLoading(false);
      });
  }, []);

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 mt-[72px]">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading properties...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 mt-[72px]">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <p className="text-gray-600 text-lg">Failed to load properties</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 mt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Available Properties</h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PropertyCardsGrid properties={data.properties} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}