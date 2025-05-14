// src/pages/DashboardPage.js
import React, { useContext, useState, useMemo } from 'react';
import InvoiceContext from '../../context/InvoiceContext';
import InvoiceSummary from '../InvoiceSummary';
import TrendsChart from '../TrendsChart';
import CategoryChart from '../CategoryChart';
import InvoiceTable from '../InvoiceTable';
import RangeSelector from '../RangeSelector';
import './DashboardPage.css';

// Helper: Extract a month-year key (format "YYYY-MM") from dueDate ("YYYY/MM/DD")
const getMonthYearKey = (dueDate) => {
  if (!dueDate) return null;
  const parts = dueDate.trim().split('/');
  if (parts.length < 2) return null;
  const year = parts[0];
  const month = parts[1].padStart(2, '0');
  return `${year}-${month}`;
};

const DashboardPage = () => {
  const { invoices, selectedAccount } = useContext(InvoiceContext);
  const [range, setRange] = useState(1); // Options: 1, 3, 6, 9, 12

  // 1) Filter by selected account, 2) group by month-year, 3) pick last `range` groups
  const filteredInvoices = useMemo(() => {
    if (!invoices || invoices.length === 0) return [];

    // --- account filter ---
    const byAccount = selectedAccount
      ? invoices.filter(inv => inv.accountNumber === selectedAccount)
      : invoices;

    // --- group by month-year ---
    const groups = byAccount.reduce((acc, inv) => {
      const key = getMonthYearKey(inv.dueDate);
      if (key) {
        if (!acc[key]) acc[key] = [];
        acc[key].push(inv);
      }
      return acc;
    }, {});

    // --- sort keys descending (most recent first) ---
    const sortedKeys = Object.keys(groups).sort(
      (a, b) => new Date(b + '-01') - new Date(a + '-01')
    );

    // --- pick top N months ---
    const selectedKeys = sortedKeys.slice(0, range);

    // --- flatten invoices from those months ---
    return selectedKeys.flatMap(key => groups[key]);
  }, [invoices, selectedAccount, range]);

  return (
    <div className="dashboard-container">
      <RangeSelector range={range} setRange={setRange} />

      <InvoiceSummary invoices={filteredInvoices} />

      <div className="charts-row">
        <div className="chart-column">
          <h3>Monthly Invoice Trends</h3>
          <TrendsChart invoices={filteredInvoices} />
        </div>
        <div className="chart-column">
          <h3>Invoices by Category</h3>
          <CategoryChart invoices={filteredInvoices} />
        </div>
      </div>

      <div className="table-section">
        <h3>COJ Invoice Data</h3>
        <InvoiceTable invoices={filteredInvoices} />
      </div>
    </div>
  );
};

export default DashboardPage;
