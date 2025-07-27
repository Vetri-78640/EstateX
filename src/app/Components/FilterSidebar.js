"use client";

export default function FilterSidebar({ filters, onChange }) {
  const minPossible = 0;
  const maxPossible = 2000000;
  const min = Number(filters.minPrice) || minPossible;
  const max = Number(filters.maxPrice) || maxPossible;

  return (
    <div className="bg-glass rounded-xl shadow-lg p-6 mb-6 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Location</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-glass backdrop-blur dark:bg-slate-800/60 dark:text-gray-100"
          placeholder="Enter city"
          value={filters.location}
          onChange={e => onChange({ ...filters, location: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Price Range</label>
        <div className="flex justify-between text-xs mb-1">
          <span className="dark:text-gray-300">${min.toLocaleString()}</span>
          <span className="dark:text-gray-300">${max.toLocaleString()}</span>
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
            className="w-1/2 accent-blue-500 bg-glass backdrop-blur dark:bg-slate-800/60"
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
            className="w-1/2 accent-blue-500 bg-glass backdrop-blur dark:bg-slate-800/60"
          />
        </div>
      </div>
    </div>
  );
}