import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../component/sidebar/Sidebar';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';

const AppContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-left: 250px;
  padding: 20px;
  width: 100%;
  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

const AnalyticsContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const AnalyticsTitle = styled.h2`
  margin-bottom: 20px;
`;

const Reports = () => {
  // Example data for charts
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Revenue',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };

  return (
    <AppContainer>
      <Sidebar />
      <Content className="container-fluid">
        <h1>Analytics</h1>
        <AnalyticsContainer>
          <AnalyticsTitle>Monthly Sales and Revenue</AnalyticsTitle>
          <Line data={chartData} />
        </AnalyticsContainer>
        {/* Add more analytics components as needed */}
      </Content>
    </AppContainer>
  );
};

export default Reports;
