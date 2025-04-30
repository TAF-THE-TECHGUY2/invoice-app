// src/components/DetailedChart.js
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './DetailedChart.css';

const DetailedChart = ({ invoices }) => {
  // Your grouping logic here...
  const data = useMemo(() => {
    // Example grouping logic
    const groups = {};
    invoices.forEach(inv => {
      const parts = inv.dueDate.split('/');
      if (parts.length >= 2) {
        const key = `${parts[0]}-${parts[1]}`;
        groups[key] = (groups[key] || 0) + inv.totalAmount;
      }
    });
    return Object.entries(groups).map(([month, total]) => ({ month, total }));
  }, [invoices]);

  return (
    <div className="analytics-card detailed-chart">
      <h2>Monthly Invoice Totals</h2>
      <LineChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default DetailedChart;
