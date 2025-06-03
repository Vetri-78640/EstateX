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
    responsive: true,
    maintainAspectRatio: false,
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
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Income vs Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <div key={property.id} className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">{property.name}</h3>
            <div className="w-[200px] h-[200px]">
              <Pie data={createPropertyChart(property)} options={options} />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Net Income: ${(property.rentalIncome - property.expenses).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}