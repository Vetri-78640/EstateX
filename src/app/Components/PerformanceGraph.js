// src/app/Components/PerformanceGraph.js
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PerformanceGraph({ properties }) {
  // Create a chart for each property
  const createPropertyChart = (property) => {
    return {
      labels: ['Rental Income', 'Expenses'],
      datasets: [
        {
          data: [property.rentalIncome, property.expenses],
          backgroundColor: [
            'rgba(56, 189, 248, 0.8)',    // Sky Blue for Rental Income
            'rgba(251, 146, 60, 0.8)',    // Amber for Expenses
          ],
          borderColor: [
            'rgba(56, 189, 248, 1)',
            'rgba(251, 146, 60, 1)',
          ],
          borderWidth: 2,
          hoverOffset: 15,
          hoverBorderWidth: 3,
        }
      ],
    };
  };

  const options = {
    responsive: true, maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 12,
            weight: 'bold'
          },
          padding: 10,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="bg-white/10 dark:bg-white/10 backdrop-blur-2xl p-8 md:p-16 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full border border-white/20 dark:border-white/10">
      <h2 className="text-3xl font-extrabold mb-10 text-gray-800 text-center tracking-tight dark:text-white">Income vs Expenses</h2>
      <div className="flex flex-wrap justify-center gap-16 w-full">
        {properties.map((property, index) => (
          <div key={property.id} className="flex flex-col items-center justify-center w-full px-4">
            <h3 className="text-xl font-semibold mb-6 text-gray-700 text-center dark:text-blue-100">{property.name}</h3>
            <div className="flex justify-center items-center w-full mb-6">
              <div className="w-full max-w-md h-[320px]">
                <Pie data={createPropertyChart(property)} options={options} />
              </div>
            </div>
            <div className="mt-2 text-base text-gray-700 text-center font-medium dark:text-slate-300">
              Net Income: <span className="font-bold text-gray-900 dark:text-blue-100">${(property.rentalIncome - property.expenses).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}