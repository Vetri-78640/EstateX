// src/app/Components/StatsPanel.js
export default function StatsPanel({ stats }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-700">Total Portfolio Value</h2>
          <p className="text-3xl font-bold">${stats.totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-700">Monthly Cashflow</h2>
          <p className="text-3xl font-bold">${stats.monthlyCashflow.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-700">Properties Tracked</h2>
          <p className="text-3xl font-bold">{stats.propertyCount}</p>
        </div>
      </div>
    );
  }