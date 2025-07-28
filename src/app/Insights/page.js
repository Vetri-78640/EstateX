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
      <div className="min-h-screen bg-transparent">
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
      <div className="min-h-screen bg-transparent">
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
    <div className="min-h-screen bg-transparent pb-12">
      <div className="max-w-6xl mx-auto px-4 py-8 mt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-blue-800 mb-10 text-center drop-shadow-sm tracking-tight dark:text-white">Market Insights</h1>

          <section className="mb-12 px-4">
  <div
    className="bg-glass shadow-2xl px-8 py-12 sm:px-14 sm:py-16 max-w-6xl mx-auto border border-blue-100 dark:border-white/20 flex flex-col md:flex-row justify-center items-center gap-10 text-center dark:bg-slate-900/60"
    style={{ borderRadius: '9999px' }}
  >
    {/* Text Content - Centered */}
    <div className="flex-1 flex flex-col justify-center items-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 dark:text-blue-100">
        U.S. Real Estate Outlook
      </h2>
      <p className="text-gray-700 mb-5 leading-relaxed text-base sm:text-lg max-w-xl dark:text-slate-300">
        {data.overallSummary.investmentStatement}
      </p>
      <p className="italic text-blue-600 font-semibold text-base sm:text-lg max-w-xl dark:text-blue-200">
        &quot;{data.overallSummary.quote}&quot;
      </p>
    </div>

    {/* ROI Card - Centered */}
    <div className="flex-1 flex justify-center items-center">
      <div
        className="bg-white/70 dark:bg-white/10 backdrop-blur-md px-10 py-8 sm:px-14 sm:py-10 shadow-lg border border-blue-100 dark:border-white/20"
        style={{ borderRadius: '9999px' }}
      >
        <div className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2 dark:text-blue-100">
          {data.overallSummary.nationalROI}%
        </div>
        <div className="text-gray-600 text-sm sm:text-base font-medium dark:text-slate-300">
          National Average ROI
        </div>
      </div>
    </div>
  </div>
</section>

          {/* ROI Bar Chart */}
          <section className="mb-14">
            <div className="bg-glass rounded-3xl shadow-2xl p-8 border border-blue-100 flex flex-col items-center" >
              <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center tracking-tight dark:text-blue-100">Statewise ROI Comparison</h2>
              <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl min-w-[320px] h-[340px] mx-auto">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </section>

          {/* State Cards Grid */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center tracking-tight transition-transform duration-200 ">State Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {data.insights.map((state, idx) => (
                <motion.div
                  key={state.state}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/20 rounded-3xl shadow-xl p-8 flex flex-col min-h-[300px] group overflow-visible transform transition-transform duration-300"
                >
                  <h3 className="text-2xl font-extrabold text-blue-700 mb-6 text-center dark:text-blue-100">{state.state}</h3>

                  <div className="flex flex-col gap-4 flex-1">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center shadow-inner" style={{ borderRadius: '9999px' }}>
                      <span className="text-gray-600 text-sm block mb-1 dark:text-slate-300">Average ROI</span>
                      <div className="font-bold text-blue-700 text-xl dark:text-blue-100">{state.averageROI}%</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center shadow-inner" style={{ borderRadius: '9999px' }}>
                      <span className="text-gray-600 text-sm block mb-1 dark:text-slate-300">Market Trend</span>
                      <div className="text-green-700 font-semibold dark:text-green-300">{state.marketTrend}</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-center shadow-inner" style={{ borderRadius: '9999px' }}>
                      <span className="text-gray-600 text-sm block mb-1 dark:text-slate-300">Investment Tip</span>
                      <div className="text-yellow-700 font-semibold dark:text-blue-300">{state.investmentTip}</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <span className="italic text-blue-600 group-hover:text-blue-800 transition-colors text-base block text-center dark:text-blue-200">
                      &quot;{state.quote}&quot;
                    </span>
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

