// src/components/LineChartPanel.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function LineChartPanel({ invoices }) {
  if (!Array.isArray(invoices) || invoices.length === 0) {
    return <p>No invoice data available for the chart.</p>;
  }

  return (
    <div className="chart-panel">
      <h3>Monthly Invoice Trends</h3>
      <LineChart
        width={400}
        height={250}
        data={invoices}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalAmount"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

export default LineChartPanel;
