// src/app/Components/PropertyCardsGrid.js
import Image from 'next/image';
export default function PropertyCardsGrid({ properties }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((p) => (
        <div 
          key={p.id} 
          className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] hover:-translate-y-1"
        >
          {/* Property Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={p.image || `https://source.unsplash.com/800x600/?house,${p.name.toLowerCase().replace(/\s+/g, ',')}`} 
              alt={p.name}
              fill
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                p.status === 'Occupied' 
                  ? 'bg-green-100 text-green-800 group-hover:bg-green-200' 
                  : 'bg-red-100 text-red-800 group-hover:bg-red-200'
              }`}>
                {p.status}
              </span>
            </div>
          </div>

          {/* Property Details */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{p.name}</h3>
            <p className="text-gray-600 mb-4 flex items-center group-hover:text-gray-800 transition-colors duration-300">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {p.location}
            </p>

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

            <div className="space-y-2">
              <div className="flex justify-between items-center group-hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300">
                <span className="text-gray-600">Rental Income</span>
                <span className="font-semibold text-green-600">${p.rentalIncome}</span>
              </div>
              <div className="flex justify-between items-center group-hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300">
                <span className="text-gray-600">Expenses</span>
                <span className="font-semibold text-red-600">${p.expenses}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}