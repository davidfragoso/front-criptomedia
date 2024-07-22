import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const PriceChart = ({ data, height = 30, width = 60 }) => {
  if (!data || data.length === 0) {
    return <div>No data</div>;
  }

  // Determinar el color de la gráfica basado en el cambio de los últimos 7 días
  const color = data[data.length - 1].price >= data[0].price ? 'rgba(0, 128, 0, 1)' : 'rgba(255, 0, 0, 1)';

  const chartData = {
    labels: data.map(point => new Date(point.timestamp).toLocaleString()),
    datasets: [
      {
        data: data.map(point => point.price),
        borderColor: color,
        borderWidth: 1,
        pointRadius: 3,
        tension: 0, // Trazos rectos y punteagudos
        fill: false
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
    },
    elements: {
      point: {
        radius: 3
      }
    }
  };

  return <Line data={chartData} options={options} width={width} height={height} />;
};

export default PriceChart;
