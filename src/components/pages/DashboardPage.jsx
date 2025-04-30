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
  const { invoices } = useContext(InvoiceContext);
  const [range, setRange] = useState(1); // Options: 1, 3, 6, 9, 12

  // Group invoices by month-year key
  const filteredInvoices = useMemo(() => {
    if (!invoices || invoices.length === 0) return [];
    const groups = invoices.reduce((acc, inv) => {
      const key = getMonthYearKey(inv.dueDate);
      if (key) {
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(inv);
      }
      return acc;
    }, {});
    
    // Sort keys descending (most recent first)
    const sortedKeys = Object.keys(groups).sort(
      (a, b) => new Date(b + '-01') - new Date(a + '-01')
    );
    
    // Select the top "range" keys
    const selectedKeys = sortedKeys.slice(0, range);
    console.log(`Selected keys for range ${range}:`, selectedKeys);
    
    // Flatten the invoices from the selected groups
    const result = selectedKeys.flatMap(key => groups[key]);
    console.log("Filtered Invoices:", result);
    return result;
  }, [invoices, range]);

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
