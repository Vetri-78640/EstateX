"use client";

export default function FilterSidebar({ filters, onChange }) {
  // Set reasonable price range defaults
  const minPossible = 0;
  const maxPossible = 2000000;
  const min = Number(filters.minPrice) || minPossible;
  const max = Number(filters.maxPrice) || maxPossible;

  return (
    <div className="border p-4 rounded-2xl shadow-md bg-white w-full max-w-xs mb-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Location</label>
        <input
          className="w-full p-2 border rounded"
          placeholder="Enter city"
          value={filters.location}
          onChange={e => onChange({ ...filters, location: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Price Range</label>
        <div className="flex justify-between text-xs mb-1">
          <span>${min.toLocaleString()}</span>
          <span>${max.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={minPossible}
            max={maxPossible}
            step={10000}
            value={min}
            onChange={e => {
              let newMin = Number(e.target.value);
              if (newMin > max) newMin = max;
              onChange({ ...filters, minPrice: newMin });
            }}
            className="w-1/2 accent-blue-500"
          />
          <input
            type="range"
            min={minPossible}
            max={maxPossible}
            step={10000}
            value={max}
            onChange={e => {
              let newMax = Number(e.target.value);
              if (newMax < min) newMax = min;
              onChange({ ...filters, maxPrice: newMax });
            }}
            className="w-1/2 accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}