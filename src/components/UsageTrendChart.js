// src/components/UsageTrendChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './UsageTrendChart.css';

const data = [
  { month: 'Jan', water: 50, electricity: 300 },
  { month: 'Feb', water: 70, electricity: 250 },
  { month: 'Mar', water: 60, electricity: 280 },
  { month: 'Apr', water: 80, electricity: 320 },
  { month: 'May', water: 90, electricity: 310 },
  { month: 'Jun', water: 75, electricity: 290 },
];

const UsageTrendChart = () => {
  return (
    <div className="usage-trend-chart">
      <h2>Overall Consumption Trends</h2>
      <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="water" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="electricity" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default UsageTrendChart;
