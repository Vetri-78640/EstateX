// src/app/Components/PropertyCardsGrid.js
import Image from 'next/image';

export default function PropertyCardsGrid({ properties }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((p) => (
        <div
          key={p.id}
          className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transition-transform hover:scale-[1.02]"
        >
          {/* Image */}
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={
                p.image ||
                `https://source.unsplash.com/800x600/?house,${p.name
                  .toLowerCase()
                  .replace(/\s+/g, ',')}`
              }
              alt={p.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  p.status === 'Occupied'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {p.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {p.name}
            </h3>
            <p className="text-gray-600 mb-4">{p.location}</p>

            {/* Value + ROI */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center">
                <p className="text-sm text-gray-700">Value</p>
                <p className="font-semibold text-gray-900">
                  ${p.value.toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center">
                <p className="text-sm text-gray-700">ROI</p>
                <p className="font-semibold text-gray-900">{p.roi}%</p>
              </div>
            </div>
            {/* Button */}
            <button className="w-full px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold backdrop-blur-md shadow hover:bg-white/20 transition">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}