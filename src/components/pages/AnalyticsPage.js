import React, { useContext, useState, useMemo } from 'react';
import InvoiceContext from '../../context/InvoiceContext';
import DataFilters from '../DataFilters';
import DetailedChart from '../DetailedChart';
import CategoryBreakdownChart from '../CategoryBreakdownChart';
import TrendComparisonChart from '../TrendComparisonChart';
import ForecastChart from '../ForecastChart';
import ExportOptions from '../ExportOptions';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const { invoices } = useContext(InvoiceContext);
  const [dateRange, setDateRange] = useState(12); // Number of months to include (e.g., last 12 months)

  // Filter invoices by dueDate (assuming format "YYYY/MM/DD")
  const filteredInvoices = useMemo(() => {
    if (!invoices || invoices.length === 0) return [];
    const currentDate = new Date();
    const cutoffDate = new Date();
    cutoffDate.setMonth(currentDate.getMonth() - dateRange);
    return invoices.filter(inv => {
      // Replace slashes with dashes for Date parsing if needed.
      const due = new Date(inv.dueDate.replace(/\//g, '-'));
      return due >= cutoffDate;
    });
  }, [invoices, dateRange]);

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>
      {/* DataFilters allow the user to choose a date range */}
      <DataFilters dateRange={dateRange} setDateRange={setDateRange} />
      {/* DetailedChart shows monthly invoice totals over time */}
      <DetailedChart invoices={filteredInvoices} />
      {/* CategoryBreakdownChart aggregates the breakdown across invoices */}
      <CategoryBreakdownChart invoices={filteredInvoices} />
      {/* TrendComparisonChart compares currentCharges vs. totalAmount for each invoice */}
      <TrendComparisonChart invoices={filteredInvoices} />
      {/* ForecastChart projects future totals based on historical data */}
      <ForecastChart invoices={filteredInvoices} />
      {/* ExportOptions let the user export the filtered data */}
      <ExportOptions invoices={filteredInvoices} />
    </div>
  );
};

export default AnalyticsPage;
