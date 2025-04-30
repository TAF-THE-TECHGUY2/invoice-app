// src/components/UsageComparisonChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './UsageComparisonChart.css';

const data = [
  { month: 'Jan', water: 50, electricity: 300, sewer: 200 },
  { month: 'Feb', water: 70, electricity: 250, sewer: 180 },
  { month: 'Mar', water: 60, electricity: 280, sewer: 220 },
  { month: 'Apr', water: 80, electricity: 320, sewer: 240 },
  { month: 'May', water: 90, electricity: 310, sewer: 210 },
  { month: 'Jun', water: 75, electricity: 290, sewer: 230 },
];

const UsageComparisonChart = () => {
  return (
    <div className="usage-comparison-chart">
      <h2>Usage Comparison (Stacked)</h2>
      <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="water" stackId="a" fill="#8884d8" />
        <Bar dataKey="electricity" stackId="a" fill="#82ca9d" />
        <Bar dataKey="sewer" stackId="a" fill="#ffc658" />
      </BarChart>
    </div>
  );
};

export default UsageComparisonChart;
