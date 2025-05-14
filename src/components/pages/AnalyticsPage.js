import React, { useContext, useState, useMemo } from 'react'; 
import InvoiceContext from '../../context/InvoiceContext';
import DataFilters from '../DataFilters';
import DetailedChart from '../DetailedChart';
import CategoryBreakdownChart from '../CategoryBreakdownChart';
import ForecastChart from '../ForecastChart';
import ExportOptions from '../ExportOptions';
import PaymentTrendLineChart from './PaymentTrendLineChart'; // ✅ New Chart

import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const { invoices, selectedAccount } = useContext(InvoiceContext);
  const [dateRange, setDateRange] = useState(12); // Number of months to include

  const filteredInvoices = useMemo(() => {
    if (!invoices || invoices.length === 0) return [];

    // 1) Filter by selected account (if any)
    const byAccount = selectedAccount
      ? invoices.filter(inv => inv.accountNumber === selectedAccount)
      : invoices;

    // 2) Then filter that list by dueDate within the past `dateRange` months
    const currentDate = new Date();
    const cutoffDate = new Date();
    cutoffDate.setMonth(currentDate.getMonth() - dateRange);

    return byAccount.filter(inv => {
      // replace slashes so Date parsing works reliably
      const due = new Date(inv.dueDate.replace(/\//g, '-'));
      return due >= cutoffDate;
    });
  }, [invoices, selectedAccount, dateRange]);

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>

      {/* Date Range Filters */}
      <DataFilters dateRange={dateRange} setDateRange={setDateRange} />

      {/* Charts & Export using the combined filteredInvoices */}
      <DetailedChart invoices={filteredInvoices} />
      <CategoryBreakdownChart invoices={filteredInvoices} />
      <PaymentTrendLineChart invoices={filteredInvoices} />
      <ForecastChart invoices={filteredInvoices} />
      <ExportOptions invoices={filteredInvoices} />
    </div>
  );
};

export default AnalyticsPage;
