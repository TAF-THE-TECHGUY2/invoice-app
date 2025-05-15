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
    return Object.entries(totals).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  }, [invoices]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF'];

  return (
    <div className="category-chart" style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <PieChart width={600} height={350}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, value }) => `${name}: R ${value.toFixed(2)}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`R ${value.toFixed(2)}`, 'Amount']}
          labelFormatter={(label) => `Category: ${label}`}
        />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </div>
  );
};

export default CategoryChart;
