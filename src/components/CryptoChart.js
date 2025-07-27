import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const CryptoChart = ({ data }) => {
  if (!data) return null;

  const labels = data.prices.map((entry) => {
    const date = new Date(entry[0]);
    return date.toLocaleTimeString();
  });

  const prices = data.prices.map((entry) => entry[1]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Price (USD)',
        data: prices,
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Line data={chartData} />
    </div>
  );
};

export default CryptoChart;
