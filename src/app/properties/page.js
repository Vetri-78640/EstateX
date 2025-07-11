'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SearchBar from '../Components/SearchBar';
import FilterSidebar from '../Components/FilterSidebar';
import Image from 'next/image';
import { secureStorage } from '@/lib/encryption';

export default function Properties() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [myProperties, setMyProperties] = useState([]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ location: '', minPrice: '', maxPrice: '' });

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
    // Load bought properties from encrypted localStorage
    const stored = secureStorage.getItem("myProperties");
    setMyProperties(stored || []);
  }, []);

  // Only render after mounted and data loaded
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

  // Exclude bought properties
  const boughtIds = myProperties.map((p) => p.id);
  const availableProperties = data.properties.filter((p) => !boughtIds.includes(p.id));
  const filteredProperties = availableProperties.filter((p) => {
    const q = search.toLowerCase();
    let matches = (
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      (p.type && p.type.toLowerCase().includes(q))
    );
    if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) matches = false;
    if (filters.minPrice && p.value < Number(filters.minPrice)) matches = false;
    if (filters.maxPrice && p.value > Number(filters.maxPrice)) matches = false;
    return matches;
  });

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8 mt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 dark:text-white">Available Properties</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 w-full">
              <div className="sticky top-28 z-20">
                <FilterSidebar filters={filters} onChange={setFilters} />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-6">
                <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((p) => (
                    <motion.div
                      key={p.id}
                      className="relative group bg-white/10 dark:bg-white/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 p-0"
                      whileHover={{ scale: 1.045, boxShadow: '0 16px 48px 0 rgba(31,38,135,0.22)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                    >
                      {/* Property Image */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-3xl bg-white/10" style={{ minHeight: '210px', maxHeight: '260px' }}>
                        <motion.div
                          className="w-full h-full"
                          whileHover={{ scale: 1.06, filter: 'brightness(1.08)' }}
                          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                        >
                          <Image
                            src={p.image || `https://source.unsplash.com/800x600/?house,${p.name.toLowerCase().replace(/\s+/g, ',')}`}
                            alt={p.name}
                            fill
                            className="object-cover w-full h-full"
                            priority={true}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
                        </motion.div>
                        <div className="absolute inset-0 pointer-events-none rounded-t-3xl shadow-[inset_0_8px_32px_0_rgba(255,255,255,0.10)]" />
                      </div>
                      <div className="h-[2px] w-full bg-gradient-to-r from-white/20 via-transparent to-white/20 my-0" />
                      {/* Property Details */}
                      <div className="flex-1 flex flex-col gap-5 px-8 py-7">
                        <h3 className="text-2xl font-extrabold text-blue-900 mb-0 truncate drop-shadow-sm dark:text-blue-100">{p.name}</h3>
                        <p className="text-slate-700 text-base font-medium truncate mb-2 dark:text-slate-300">{p.location}</p>
                        <div className="flex gap-4 mb-4">
                          <span className="px-5 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/20 dark:border-white/10 text-blue-900 font-bold text-xs flex-1 text-center dark:text-blue-100">Value<br/><span className='text-base dark:text-blue-100'>${p.value.toLocaleString()}</span></span>
                          <span className="px-5 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/20 dark:border-white/10 text-blue-900 font-bold text-xs flex-1 text-center dark:text-blue-100">ROI<br/><span className='text-base dark:text-blue-100'>{p.roi}%</span></span>
                        </div>
                        <button
                          className="mt-auto px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-xl font-semibold shadow-lg transition rounded-full text-blue-800 hover:text-blue-900 hover:shadow-xl border border-white/20 dark:border-white/10 dark:text-blue-100"
                          style={{ borderRadius: '9999px', fontWeight: 700, fontSize: '1rem', WebkitBackdropFilter: 'blur(16px)' }}
                          onClick={() => router.push(`/property/${p.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}