// src/components/Charts.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ChartWrapper = styled.div`
  flex: 1;
  padding: 10px;
`;

const lineChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    },
  ],
};

const lineChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Revenue',
      data: [40, 50, 70, 90, 60, 70],
      fill: false,
      backgroundColor: 'rgba(153,102,255,0.4)',
      borderColor: 'rgba(153,102,255,1)',
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const Charts = () => {
  return (
    <ChartsContainer>
      <ChartWrapper>
        <Line data={lineChartData1} options={lineChartOptions} />
      </ChartWrapper>
      <ChartWrapper>
        <Line data={lineChartData2} options={lineChartOptions} />
      </ChartWrapper>
    </ChartsContainer>
  );
};

export default Charts;
