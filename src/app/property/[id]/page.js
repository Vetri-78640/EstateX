"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PerformanceGraph from "../../Components/PerformanceGraph";
import Image from 'next/image';

export default function PropertyDetails() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBought, setIsBought] = useState(false);
  const [isRented, setIsRented] = useState(false);
  const [occupied, setOccupied] = useState(false);

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
    'Default': { lat: 40.7128, lng: -74.0060 }, // New York
  };

  useEffect(() => {
    // Fetch property details (simulate by fetching all and finding by id)
    fetch("https://dummyjson.com/c/89e7-1260-41be-b3e9")
      .then((res) => res.json())
      .then((json) => {
        const found = json.properties.find((p) => String(p.id) === String(id));
        setProperty(found);
        setLoading(false);
        // Check if bought
        const stored = localStorage.getItem("myProperties");
        if (stored) {
          const arr = JSON.parse(stored);
          const match = arr.find((p) => String(p.id) === String(id));
          if (match) {
            setIsBought(true);
            setIsRented(!!match.isRented);
            setOccupied(!!match.occupied);
          }
        }
      });
  }, [id]);

  const handleBuy = () => {
    const stored = localStorage.getItem("myProperties");
    let arr = stored ? JSON.parse(stored) : [];
    arr.push({ ...property, isRented: false, occupied: false });
    localStorage.setItem("myProperties", JSON.stringify(arr));
    setIsBought(true);
  };

  const handleSell = () => {
    const stored = localStorage.getItem("myProperties");
    let arr = stored ? JSON.parse(stored) : [];
    arr = arr.filter((p) => String(p.id) !== String(id));
    localStorage.setItem("myProperties", JSON.stringify(arr));
    setIsBought(false);
    setIsRented(false);
    setOccupied(false);
    // Optionally redirect to dashboard or properties
    router.push("/dashboard");
  };

  const handleToggleRent = () => {
    const stored = localStorage.getItem("myProperties");
    let arr = stored ? JSON.parse(stored) : [];
    arr = arr.map((p) =>
      String(p.id) === String(id)
        ? { ...p, isRented: !isRented, occupied: !isRented }
        : p
    );
    localStorage.setItem("myProperties", JSON.stringify(arr));
    setIsRented((prev) => !prev);
    setOccupied((prev) => !prev);
  };

  if (loading || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading property details...</p>
        </div>
      </div>
    );
  }

  // Extract city from 'City, ST' format
  const city = property.location ? property.location.split(',')[0].trim() : 'Default';
  const loc = city && locationToLatLng[city] ? city : 'Default';
  const { lat, lng } = locationToLatLng[loc];
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 py-12 mt-[72px]">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transition-transform duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)] hover:scale-[1.025]">
        <Image
          src={property.image}
          alt={property.name}
          width={800}
          height={256}
          className="w-full h-64 object-cover rounded-xl mb-6"
          priority={true}
        />
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{property.name}</h1>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Value</p>
            <p className="font-semibold text-gray-800">${property.value.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">ROI</p>
            <p className="font-semibold text-gray-800">{property.roi}%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Rental Income</p>
            <p className="font-semibold text-green-700">${property.rentalIncome}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Expenses</p>
            <p className="font-semibold text-red-600">${property.expenses}</p>
          </div>
        </div>
        <div className="mb-6">
          <iframe
            src={embedUrl}
            width="100%"
            height="220"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
        <div className="flex gap-4 mb-6">
          {!isBought && (
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              onClick={handleBuy}
            >
              Buy
            </button>
          )}
          {isBought && (
            <button
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition"
              onClick={handleSell}
            >
              Sell
            </button>
          )}
          {isBought && (
            <button
              className={`px-6 py-3 rounded-lg font-semibold shadow transition ${isRented ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-green-600 text-white hover:bg-green-700'}`}
              onClick={handleToggleRent}
            >
              {isRented ? 'Stop Renting' : 'Leave Rent'}
            </button>
          )}
        </div>
        {isBought && (
          <div className="mb-4">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${isRented ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{isRented ? (occupied ? 'Occupied' : 'Vacant') : 'Not Rented'}</span>
          </div>
        )}
        {isBought && isRented && (
          <div className="mt-8">
            <PerformanceGraph properties={[property]} />
          </div>
        )}
      </div>
    </div>
  );
} 