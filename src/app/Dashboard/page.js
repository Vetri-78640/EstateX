'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { secureStorage } from '@/lib/encryption';

const Dashboard = () => {
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [fadingOut, setFadingOut] = useState({});
  const router = useRouter();

  // Map of city/location to random lat/lng
  const locationToLatLng = {
    'New York': { lat: 40.7128, lng: -74.0060 },
    'San Francisco': { lat: 37.7749, lng: -122.4194 },
    'Los Angeles': { lat: 34.0522, lng: -118.2437 },
    'Chicago': { lat: 41.8781, lng: -87.6298 },
    'Miami': { lat: 25.7617, lng: -80.1918 },
    'Austin': { lat: 30.2672, lng: -97.7431 },
    'Dallas': { lat: 32.7767, lng: -96.7970 },
    'Seattle': { lat: 47.6062, lng: -122.3321 },
    'Boston': { lat: 42.3601, lng: -71.0589 },
    'Denver': { lat: 39.7392, lng: -104.9903 },
    'Portland': { lat: 45.5152, lng: -122.6784 },
    'Atlanta': { lat: 33.7490, lng: -84.3880 },
    'Orlando': { lat: 28.5383, lng: -81.3792 },
    'Las Vegas': { lat: 36.1699, lng: -115.1398 },
    'Phoenix': { lat: 33.4484, lng: -112.0740 },
    'Philadelphia': { lat: 39.9526, lng: -75.1652 },
    'Houston': { lat: 29.7604, lng: -95.3698 },
    'Charlotte': { lat: 35.2271, lng: -80.8431 },
    'Nashville': { lat: 36.1627, lng: -86.7816 },
    'San Diego': { lat: 32.7157, lng: -117.1611 },
    'Washington': { lat: 38.9072, lng: -77.0369 },
    'Tampa': { lat: 27.9506, lng: -82.4572 },
    'San Jose': { lat: 37.3382, lng: -121.8863 },
    'Minneapolis': { lat: 44.9778, lng: -93.2650 },
    'Detroit': { lat: 42.3314, lng: -83.0458 },
    'Malibu': { lat: 34.0259, lng: -118.7798 },
    'Default': { lat: 40.7128, lng: -74.0060 }, // New York
  };

  useEffect(() => {
    setMounted(true);
    // Load bought properties from encrypted localStorage
    const stored = secureStorage.getItem("myProperties");
    setMyProperties(stored || []);
    setLoading(false);
  }, []);

  // Remove (sell) property
  const handleSell = async (id) => {
    setFadingOut((prev) => ({ ...prev, [id]: true }));
    await new Promise((res) => setTimeout(res, 1200)); // 1.2s delay for realism
    const updated = myProperties.filter((p) => p.id !== id);
    setMyProperties(updated);
    secureStorage.setItem("myProperties", updated);
    setFadingOut((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // Empty state for new users
  if (!mounted) return null;
  if (loading) {
    return (
      <div className="min-h-screen bg-transparent">
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
      <div className="min-h-screen bg-transparent flex items-center justify-center" >
        <div className="max-w-md mx-auto bg-white/20 backdrop-blur-md border border-white/30 shadow-lg rounded-3xl p-8 flex flex-col items-center" style={{ borderRadius: '9999px' }}>
          <p className="text-xl font-semibold text-black-700 mb-4 text-center">&quot;In real estate, you make your money when you buy, not when you sell.&quot;</p>
          <button
            className="mt-2 px-6 py-3 btn-glass border border-blue-400 rounded-full font-semibold shadow hover:border-blue-500 hover:text-blue-800 bg-white/30 backdrop-blur text-blue-700 transition"
            style={{ borderRadius: '9999px' }}
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
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-2 sm:px-4 py-8 mt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center dark:text-slate-100">Dashboard</h1>
          <div className="flex flex-wrap justify-center gap-8">
            {myProperties.map((property) => {
              let statusBadge = null;
              if (property.isRented) {
                statusBadge = (
                  <span className={`absolute top-3 right-3 px-4 py-1 rounded-full text-xs font-semibold shadow-md z-10 ${property.occupied ? 'bg-green-100 text-green-800' : 'bg-yellow-400 text-gray-900'}`}>
                    {property.occupied ? 'Occupied' : 'Vacant'}
                  </span>
                );
              }
              return (
                <motion.div
                  key={property.id}
                  className="bg-glass rounded-2xl shadow-xl w-full max-w-md flex flex-col border border-gray-100 overflow-hidden transform dark:border-white/20"
                  style={{ minWidth: '320px' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <div className="relative w-full aspect-[4/3] min-h-[192px] max-h-[240px] rounded-t-xl overflow-hidden bg-white/10">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover"
                      priority={true}
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-blue-800 mb-1 truncate dark:text-blue-200">{property.name}</h3>
                    <p className="text-gray-500 mb-1 text-sm truncate dark:text-slate-300">{property.location}</p>
                    <div className="flex flex-wrap gap-4 mb-2 text-sm">
                      <span className="text-gray-700 font-semibold dark:text-blue-100">Value: <span className="text-gray-900 dark:text-blue-200">${property.value.toLocaleString()}</span></span>
                      <span className="text-gray-700 font-semibold dark:text-blue-100">ROI: <span className="text-blue-700 dark:text-blue-200">{property.roi}%</span></span>
                    </div>
                    {property.isRented && (
                      <span className="text-green-700 font-semibold text-sm dark:text-green-300">Rental Income: ${property.rentalIncome}</span>
                    )}
                    <div className="flex gap-2 mt-3">
                      <button
                        className="flex-1 px-4 py-2 btn-glass font-semibold shadow transition rounded-full dark:text-blue-100"
                        style={{ borderRadius: '9999px' }}
                        onClick={e => { e.stopPropagation(); router.push(`/property/${property.id}`); }}
                      >
                        View Details
                      </button>
                      <button
                        className="flex-1 px-4 py-2 btn-glass font-semibold shadow transition disabled:opacity-60 rounded-full dark:text-blue-100"
                        style={{ borderRadius: '9999px' }}
                        onClick={e => { e.stopPropagation(); handleSell(property.id); }}
                        disabled={!!fadingOut[property.id]}
                      >
                        {fadingOut[property.id] ? 'Selling...' : 'Sell'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;