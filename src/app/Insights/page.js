'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Insights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('https://dummyjson.com/c/0306-0a0e-4b89-8b38')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch insights', err);
        setLoading(false);
      });
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 mt-[72px]">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading insights...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8 mt-[72px]">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <p className="text-gray-600 text-lg">Failed to load insights</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for the ROI bar chart
  const roiLabels = data.insights.map((s) => s.state);
  const roiData = data.insights.map((s) => s.averageROI);

  const barData = {
    labels: roiLabels,
    datasets: [
      {
        label: 'Average ROI (%)',
        data: roiData,
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        borderRadius: 8,
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y}% ROI`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'ROI (%)' },
      },
      x: {
        title: { display: true, text: 'State' },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 pb-12">
      <div className="max-w-6xl mx-auto px-4 py-8 mt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow-sm tracking-tight">Market Insights</h1>

          {/* Summary Card */}
          <section className="mb-12">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-10 border border-blue-100">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-blue-700 mb-2">U.S. Real Estate Outlook</h2>
                <p className="text-gray-700 mb-3 leading-relaxed text-lg">{data.overallSummary.investmentStatement}</p>
                <p className="italic text-blue-600 font-semibold text-lg">&quot;{data.overallSummary.quote}&quot;</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="bg-blue-50 rounded-2xl p-8 text-center shadow-md border border-blue-100">
                  <div className="text-5xl font-extrabold text-blue-700 mb-1">{data.overallSummary.nationalROI}%</div>
                  <div className="text-gray-600 text-base font-medium">National Average ROI</div>
                </div>
              </div>
            </div>
          </section>

          {/* ROI Bar Chart */}
          <section className="mb-14">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-8 border border-blue-100 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-tight">Statewise ROI Comparison</h2>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl min-w-[320px] h-[340px] mx-auto">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </section>

          {/* State Cards Grid */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center tracking-tight">State Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {data.insights.map((state, idx) => (
                <motion.div
                  key={state.state}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white/95 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.04] hover:-translate-y-1 p-8 flex flex-col min-h-[300px] group"
                >
                  <h3 className="text-2xl font-extrabold text-blue-700 mb-4 group-hover:text-blue-900 transition-colors tracking-tight">{state.state}</h3>
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="bg-blue-50 rounded-xl px-4 py-3">
                      <span className="text-gray-600 text-xs">Average ROI</span>
                      <div className="font-bold text-blue-700 text-lg">{state.averageROI}%</div>
                    </div>
                    <div className="bg-green-50 rounded-xl px-4 py-3">
                      <span className="text-gray-600 text-xs">Market Trend</span>
                      <div className="text-green-700 font-semibold">{state.marketTrend}</div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl px-4 py-3">
                      <span className="text-gray-600 text-xs">Investment Tip</span>
                      <div className="text-yellow-700 font-semibold">{state.investmentTip}</div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="italic text-blue-600 group-hover:text-blue-800 transition-colors text-base block text-center">&quot;{state.quote}&quot;</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

