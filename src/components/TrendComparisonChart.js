import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './TrendComparisonChart.css';

const TrendComparisonChart = ({ invoices }) => {
  // For simplicity, assume we plot each invoice using dueDate as the x-axis label.
  const data = useMemo(() => {
    return invoices.map(inv => ({
      dueDate: inv.dueDate,
      Total: inv.totalAmount,
      Current: inv.currentCharges
    })).sort((a, b) => new Date(b.dueDate.replace(/\//g, '-')) - new Date(a.dueDate.replace(/\//g, '-')));
  }, [invoices]);

  return (
    <div className="trend-comparison-chart">
      <h2>Trend Comparison: Total vs. Current Charges</h2>
      <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dueDate" tickFormatter={date => date.split('/').join('-')} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="#8884d8" />
        <Bar dataKey="Current" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default TrendComparisonChart;
