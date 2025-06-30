'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SearchBar from '../Components/SearchBar';
import FilterSidebar from '../Components/FilterSidebar';
import Image from 'next/image';

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
    // Load bought properties from localStorage
    const stored = localStorage.getItem("myProperties");
    setMyProperties(stored ? JSON.parse(stored) : []);
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
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 mt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Available Properties</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 w-full">
              <FilterSidebar filters={filters} onChange={setFilters} />
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
                    <div 
                      key={p.id} 
                      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] hover:-translate-y-1 flex flex-col"
                    >
                      {/* Property Image */}
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={p.image || `https://source.unsplash.com/800x600/?house,${p.name.toLowerCase().replace(/\s+/g, ',')}`}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          priority={true}
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
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}