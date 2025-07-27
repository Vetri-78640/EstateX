'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SearchBar from '../Components/SearchBar';
import FilterSidebar from '../Components/FilterSidebar';
import Image from 'next/image';
import { secureStorage } from '@/lib/encryption';
import { useAuth } from '@/lib/firebase/AuthContext';

export default function Properties() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [myProperties, setMyProperties] = useState([]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ location: '', minPrice: '', maxPrice: '' });
  const { user } = useAuth();

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

    const userId = user?.uid;
    if (userId) {
      const stored = secureStorage.getItem("myProperties", userId);
      setMyProperties(stored || []);
    } else {
      setMyProperties([]);
    }
  }, [user]);

  if (!mounted || loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading properties...</p>
        </div>
      </div>
    );
  }

  const boughtIds = myProperties.map((p) => p.id);
  const availableProperties = data.properties.filter((p) => !boughtIds.includes(p.id));

  const filteredProperties = availableProperties.filter((p) => {
    const q = search.toLowerCase();
    let matches =
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      (p.type && p.type.toLowerCase().includes(q));

    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) matches = false;
    if (filters.minPrice && p.value < Number(filters.minPrice)) matches = false;
    if (filters.maxPrice && p.value > Number(filters.maxPrice)) matches = false;

    return matches;
  });

  return (
    <div className="min-h-screen bg-transparent py-12 mt-[72px]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 dark:text-white">Available Properties</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
              <FilterSidebar filters={filters} onChange={setFilters} />
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* ✅ Correct search bar props */}
              <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
              
              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    className="bg-glass rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform dark:border-white/20 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    onClick={() => router.push(`/property/${property.id}`)}
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
                    {/* Property Details */}
                    <div className="flex-1 flex flex-col gap-5 px-8 py-7">
                        <h3 className="text-2xl font-extrabold text-blue-900 mb-0 truncate drop-shadow-sm dark:text-blue-100">{property.name}</h3>
                        <p className="text-slate-700 text-base font-medium truncate mb-2 dark:text-slate-300">{property.location}</p>
                        <div className="flex gap-4 mb-4">
                          <span className="px-5 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/20 dark:border-white/10 text-blue-900 font-bold text-xs flex-1 text-center dark:text-blue-100">Value<br/><span className='text-base dark:text-blue-100'>${property.value.toLocaleString()}</span></span>
                          <span className="px-5 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/20 dark:border-white/10 text-blue-900 font-bold text-xs flex-1 text-center dark:text-blue-100">ROI<br/><span className='text-base dark:text-blue-100'>{property.roi}%</span></span>
                        </div>
                        <button
                          className="mt-auto px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-xl font-semibold shadow-lg transition rounded-full text-blue-800 hover:text-blue-900 hover:shadow-xl border border-white/20 dark:border-white/10 dark:text-blue-100"
                          style={{ borderRadius: '9999px', fontWeight: 700, fontSize: '1rem', WebkitBackdropFilter: 'blur(16px)' }}
                          onClick={() => router.push(`/property/${property.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                  </motion.div>
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg dark:text-slate-300">No properties found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}