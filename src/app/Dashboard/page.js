'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropertyCardsGrid from '../Components/PropertyCard';
import StatsPanel from '../Components/StatsPanel';
import PerformanceGraph from '../Components/PerformanceGraph';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Load bought properties from localStorage
    const stored = localStorage.getItem("myProperties");
    setMyProperties(stored ? JSON.parse(stored) : []);
    setLoading(false);
  }, []);

  // Remove (sell) property
  const handleSell = (id) => {
    const updated = myProperties.filter((p) => p.id !== id);
    setMyProperties(updated);
    localStorage.setItem("myProperties", JSON.stringify(updated));
  };

  // Empty state for new users
  if (!mounted) return null;
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 mt-[72px]">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!myProperties || myProperties.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <p className="text-xl font-semibold text-blue-700 mb-4 text-center">"In real estate, you make your money when you buy, not when you sell."</p>
          <button
            className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => router.push("/properties")}
          >
            Buy Properties
          </button>
        </div>
      </div>
    );
  }

  // Show bought properties
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 mt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
          <div className="grid gap-6">
            {/* StatsPanel can be added here if you want to show stats for bought properties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {myProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                  <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{property.name}</h3>
                  <p className="text-gray-600 mb-1">{property.location}</p>
                  <p className="text-gray-600 mb-1">Value: <span className="font-semibold">${property.value.toLocaleString()}</span></p>
                  <p className="text-gray-600 mb-4">ROI: <span className="font-semibold">{property.roi}%</span></p>
                  <div className="flex gap-2 mt-auto">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      onClick={() => router.push(`/property/${property.id}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      onClick={() => handleSell(property.id)}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;