// src/components/InvoiceTable.js
import React, { useMemo } from 'react';
import './InvoiceTable.css';

// Helper to format dueDate as "Mon DD, YYYY"
const formatMonthDayYear = (dueDate) => {
  if (!dueDate) return 'N/A';
  const parts = dueDate.split('/');
  if (parts.length !== 3) return dueDate;
  const [year, monthNum, day] = parts;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[parseInt(monthNum, 10) - 1] || monthNum;
  return `${monthName} ${day}, ${year}`;
};

// Helper to format a number as currency (e.g., "R54 981.75")
const formatCurrency = (number) => {
  if (number === null || number === undefined) return 'R0.00';
  return 'R' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const InvoiceTable = ({ invoices }) => {
  // Sort invoices by dueDate ascending
  const sortedInvoices = useMemo(() => {
    return [...invoices].sort(
      (a, b) =>
        new Date(a.dueDate.replace(/\//g, '-')) - new Date(b.dueDate.replace(/\//g, '-'))
    );
  }, [invoices]);

  // Compute difference and % change for each invoice (from previous one)
  const tableData = useMemo(() => {
    return sortedInvoices.map((inv, index) => {
      if (index === 0) {
        return { ...inv, difference: 0, percentChange: 'N/A' };
      }
      const prev = sortedInvoices[index - 1];
      const difference = inv.totalAmount - prev.totalAmount;
      const percentChange =
        prev.totalAmount !== 0 ? ((difference / prev.totalAmount) * 100).toFixed(2) + '%' : 'N/A';
      return { ...inv, difference, percentChange };
    });
  }, [sortedInvoices]);

  return (
    <div className="invoice-table-wrapper">
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Month & Day, Year</th>
            <th>Total Amount (R)</th>
            <th>Difference (R)</th>
            <th>% Change</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{formatMonthDayYear(row.dueDate)}</td>
              <td>{formatCurrency(row.totalAmount)}</td>
              <td className={row.difference >= 0 ? 'positive' : 'negative'}>
                {row.difference >= 0
                  ? `+${formatCurrency(row.difference)}`
                  : formatCurrency(Math.abs(row.difference))}
              </td>
              <td className={row.difference >= 0 ? 'positive' : 'negative'}>
                {row.percentChange}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
