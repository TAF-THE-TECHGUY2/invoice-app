import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './ForecastChart.css';

const ForecastChart = ({ invoices }) => {
  const forecastData = useMemo(() => {
    if (invoices.length === 0) return [];
    // Calculate the average totalAmount from existing invoices.
    const avgTotal = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0) / invoices.length;
    // Create forecast for next 6 months with a simple constant forecast.
    const futureMonths = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYear = new Date().getFullYear();
    return futureMonths.map(month => ({
      month: `${month} ${currentYear}`,
      forecast: Math.round(avgTotal * 100) / 100
    }));
  }, [invoices]);

  return (
    <div className="forecast-chart">
      <h2>Invoice Forecast (Next 6 Months)</h2>
      <LineChart width={600} height={300} data={forecastData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="forecast" stroke="#ff7300" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default ForecastChart;
