import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const formatMonthLabel = (date) =>
  date.toLocaleString('default', { month: 'short', year: 'numeric' });

const generateMonthRange = (startDate, endDate) => {
  const range = [];
  const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const last = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  while (current <= last) {
    const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`; // e.g. 2024-05
    range.push({ key, label: formatMonthLabel(current), date: new Date(current) });
    current.setMonth(current.getMonth() + 1);
  }

  return range;
};

const PaymentTrendLineChart = ({ invoices }) => {
  const chartData = useMemo(() => {
    if (!invoices || invoices.length === 0) return [];

    const sorted = [...invoices].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    const startDate = new Date(sorted[0].dueDate.replace(/\//g, '-'));
    const endDate = new Date(sorted[sorted.length - 1].dueDate.replace(/\//g, '-'));
    const monthRange = generateMonthRange(startDate, endDate);

    const monthlyTotals = {};
    sorted.forEach((inv) => {
      const [year, month] = inv.dueDate.split('/');
      const key = `${year}-${month.padStart(2, '0')}`;
      if (!monthlyTotals[key]) {
        monthlyTotals[key] = { totals: [], spike: 0 };
      }

      monthlyTotals[key].totals.push(inv.totalAmount || 0);
      if (inv.incomingPayment === 0) {
        monthlyTotals[key].spike += inv.totalAmount || 0;
      }
    });

    const data = monthRange.map((monthObj, idx) => {
      const prev6 = monthRange.slice(Math.max(0, idx - 5), idx + 1);
      const totalValues = prev6.flatMap(({ key }) =>
        monthlyTotals[key]?.totals || []
      );
      const avgTotal =
        totalValues.length > 0
          ? totalValues.reduce((sum, val) => sum + val, 0) / totalValues.length
          : 0;

      return {
        month: monthObj.label,
        avgTotal: parseFloat(avgTotal.toFixed(2)),
        noPaymentSpike: parseFloat(
          (monthlyTotals[monthObj.key]?.spike || 0).toFixed(2)
        ),
      };
    });

    return data;
  }, [invoices]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>Payment Trends</h3>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `R${v.toLocaleString()}`} />
          <Tooltip formatter={(v) => `R${v.toLocaleString()}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="avgTotal"
            stroke="#4e79a7"
            strokeWidth={2}
            name="Avg. Total (6 months)"
          />
          <Line
            type="monotone"
            dataKey="noPaymentSpike"
            stroke="#e15759"
            strokeWidth={2}
            name="No Payment Spike"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentTrendLineChart;
