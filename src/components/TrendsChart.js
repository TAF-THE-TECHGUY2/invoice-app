// src/components/TrendsChart.js
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './TrendsChart.css';

const TrendsChart = ({ invoices }) => {
  // Group invoices by month ("YYYY-MM") and sum totalAmount.
  const data = useMemo(() => {
    const groups = {};
    invoices.forEach(inv => {
      if (inv.dueDate) {
        const parts = inv.dueDate.split('/');
        if (parts.length >= 2) {
          const key = `${parts[0]}-${parts[1]}`; // e.g., "2025-01"
          groups[key] = (groups[key] || 0) + (inv.totalAmount || 0);
        }
      }
    });
    const arr = Object.entries(groups).map(([month, total]) => ({ month, total }));
    // Sort descending (most recent first)
    arr.sort((a, b) => new Date(b.month + '-01') - new Date(a.month + '-01'));
    return arr;
  }, [invoices]);

  return (
    <div className="trends-chart">
      <LineChart width={400} height={200} data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default TrendsChart;
