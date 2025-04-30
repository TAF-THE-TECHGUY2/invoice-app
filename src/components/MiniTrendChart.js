import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import './MiniTrendChart.css';

const data = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 300 },
  { month: 'Mar', value: 500 },
  { month: 'Apr', value: 200 },
  { month: 'May', value: 600 },
];

const MiniTrendChart = () => {
  return (
    <div className="mini-trend-chart">
      <LineChart width={300} height={100} data={data}>
        <XAxis dataKey="month" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
      </LineChart>
    </div>
  );
};

export default MiniTrendChart;
