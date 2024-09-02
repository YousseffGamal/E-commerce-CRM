import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import classNames from 'classnames';
import Style from './BarChart.module.css'; // CSS Module for bar chart styles

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const createStripedPattern = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const stripeWidth = 10; // Width of each stripe
  const stripeSpacing = 10; // Spacing between stripes
  const patternHeight = stripeWidth + stripeSpacing;
  
  canvas.width = stripeWidth;
  canvas.height = patternHeight;

  // Transparent background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw colored stripes
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Stripe color with transparency
  ctx.fillRect(0, 0, canvas.width, stripeWidth);
  ctx.fillRect(0, stripeWidth + stripeSpacing, canvas.width, stripeWidth);

  return ctx.createPattern(canvas, 'repeat');
};

const BarChart = ({ data }) => {
  const patternRef = useRef(createStripedPattern);

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [{
      label: 'Monthly Data',
      data: data.map(d => d.value),
      backgroundColor: patternRef.current, // Apply the striped pattern
      borderColor: '#e0e0e0',
      borderWidth: 1,
      borderRadius: 5,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className={classNames(Style.barChartContainer)}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
