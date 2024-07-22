import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const PriceChart = ({ data, color = 'rgba(255, 165, 0, 1)', height = 45, width = 100 }) => {
  const chartData = {
    labels: ['7d', '24h', '1h'],
    datasets: [
      {
        data: [data.percent_change_7d, data.percent_change_24h, data.percent_change_1h],
        borderColor: color,
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: false
      }
    }
  };

  return <Line data={chartData} options={options} width={width} height={height} />;
};

export default PriceChart;
