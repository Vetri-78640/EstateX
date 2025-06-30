'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Properties() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [myProperties, setMyProperties] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetch('https://dummyjson.com/c/89e7-1260-41be-b3e9')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch data', err);
        setLoading(false);
      });
    // Load bought properties from localStorage
    const stored = localStorage.getItem("myProperties");
    setMyProperties(stored ? JSON.parse(stored) : []);
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

  // Exclude bought properties
  const boughtIds = myProperties.map((p) => p.id);
  const availableProperties = data.properties.filter((p) => !boughtIds.includes(p.id));

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProperties.map((p) => (
                <div 
                  key={p.id} 
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] hover:-translate-y-1 flex flex-col"
                >
                  {/* Property Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={p.image || `https://source.unsplash.com/800x600/?house,${p.name.toLowerCase().replace(/\s+/g, ',')}`}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Property Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{p.name}</h3>
                    <p className="text-gray-600 mb-2">{p.location}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
                        <p className="text-sm text-gray-600">Value</p>
                        <p className="font-semibold text-gray-800">${p.value.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg group-hover:bg-gray-100 transition-colors duration-300">
                        <p className="text-sm text-gray-600">ROI</p>
                        <p className="font-semibold text-gray-800">{p.roi}%</p>
                      </div>
                    </div>
                    <button
                      className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      onClick={() => router.push(`/property/${p.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}