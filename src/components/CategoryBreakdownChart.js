import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './CategoryBreakdownChart.css';

const CategoryBreakdownChart = ({ invoices }) => {
  const aggregated = useMemo(() => {
    const totals = {
      Rates: 0,
      Electricity: 0,
      Water: 0,
      Refuse: 0,
      Sewer: 0
    };
    invoices.forEach((inv) => {
      const breakdown = inv.breakdown;
      if (breakdown) {
        totals.Rates += breakdown.Rates || 0;
        totals.Electricity += breakdown.Electricity || 0;
        totals.Water += breakdown.Water || 0;
        totals.Refuse += breakdown.Refuse || 0;
        totals.Sewer += breakdown.Sewer || 0;
      }
    });
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [invoices]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

  return (
    <div className="category-breakdown-chart">
      <h2>Category Breakdown</h2>
      <PieChart width={400} height={300}>
        <Pie data={aggregated} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {aggregated.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryBreakdownChart;
