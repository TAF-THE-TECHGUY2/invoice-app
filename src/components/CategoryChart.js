// src/components/CategoryChart.js
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './CategoryChart.css';

const CategoryChart = ({ invoices }) => {
  const data = useMemo(() => {
    const totals = {
      Rates: 0,
      Electricity: 0,
      Water: 0,
      Refuse: 0,
      Sewer: 0,
    };
    invoices.forEach(inv => {
      if (inv.breakdown) {
        totals.Rates += inv.breakdown.Rates || 0;
        totals.Electricity += inv.breakdown.Electricity || 0;
        totals.Water += inv.breakdown.Water || 0;
        totals.Refuse += inv.breakdown.Refuse || 0;
        totals.Sewer += inv.breakdown.Sewer || 0;
      }
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [invoices]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

  return (
    <div className="category-chart">
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryChart;
