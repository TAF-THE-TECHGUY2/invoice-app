// src/pages/InvoicesPage.js
import React, { useContext, useState, useMemo } from 'react';
import InvoiceContext from '../../context/InvoiceContext';
import './InvoicesPage.css';

// Helper function to clean invoice number (remove trailing "Next" if present)
const cleanInvoiceNumber = (invoiceNumber) => {
  if (!invoiceNumber) return 'N/A';
  return invoiceNumber.replace(/Next$/i, '').trim();
};

// Helper function to format a number as currency (e.g., "R54 981.75")
const formatCurrency = (number) => {
  if (number === null || number === undefined) return 'R0.00';
  return 'R' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Helper function to format dueDate as "Mon DD, YYYY"
// Expects dueDate in "YYYY/MM/DD" format.
const formatMonthDayYear = (dueDate) => {
  if (!dueDate) return 'N/A';
  const parts = dueDate.split('/');
  if (parts.length !== 3) return dueDate;
  const [year, monthNum, day] = parts;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = monthNames[parseInt(monthNum, 10) - 1] || monthNum;
  return `${monthName} ${day}, ${year}`;
};

const InvoicesPage = () => {
  const { invoices } = useContext(InvoiceContext); // Get invoices from context
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter invoices based on search term (searching in invoiceNumber and accountNumber)
  const filteredInvoices = invoices.filter((invoice) =>
    cleanInvoiceNumber(invoice.invoiceNumber || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (invoice.accountNumber || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Sorting logic; for breakdown fields, use values from the breakdown object
  const sortedInvoices = useMemo(() => {
    let sortable = [...filteredInvoices];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aValue, bValue;
        if (['Rates', 'Electricity', 'Water', 'Refuse', 'Sewer'].includes(sortConfig.key)) {
          aValue = a.breakdown ? a.breakdown[sortConfig.key] || 0 : 0;
          bValue = b.breakdown ? b.breakdown[sortConfig.key] || 0 : 0;
        } else if (sortConfig.key === 'invoiceNumber') {
          aValue = cleanInvoiceNumber(a.invoiceNumber);
          bValue = cleanInvoiceNumber(b.invoiceNumber);
        } else {
          aValue = a[sortConfig.key] || 0;
          bValue = b[sortConfig.key] || 0;
        }
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [filteredInvoices, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedInvoices.length / pageSize);
  const paginatedInvoices = sortedInvoices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Export invoice data to CSV (including Month & Day with Year)
  const exportToCSV = () => {
    const header = [
      'Invoice Number',
      'Month & Day, Year',
      'Account Number',
      'Rates Amount',
      'Electricity Amount',
      'Water Amount',
      'Refuse Amount',
      'Sewer Amount',
      'Total Amount'
    ];
    const rows = sortedInvoices.map((inv) => [
      cleanInvoiceNumber(inv.invoiceNumber),
      formatMonthDayYear(inv.dueDate),
      inv.accountNumber || '',
      formatCurrency(inv.breakdown?.Rates || 0),
      formatCurrency(inv.breakdown?.Electricity || 0),
      formatCurrency(inv.breakdown?.Water || 0),
      formatCurrency(inv.breakdown?.Refuse || 0),
      formatCurrency(inv.breakdown?.Sewer || 0),
      formatCurrency(inv.totalAmount || 0)
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'invoices.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dummy PDF export (to be implemented)
  const exportToPDF = () => {
    alert('Export to PDF functionality to be implemented.');
  };

  // Download original PDF (expects each invoice object to include a pdfUrl property)
  const downloadInvoicePDF = (invoice) => {
    if (invoice.pdfUrl) {
      const link = document.createElement('a');
      link.href = invoice.pdfUrl;
      link.download = `${cleanInvoiceNumber(invoice.invoiceNumber)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('PDF not available for this invoice.');
    }
  };

  return (
    <div className="invoices-page">
      <h1>Invoices</h1>

      <div className="export-buttons">
        <button onClick={exportToCSV}>Export CSV</button>
        <button onClick={exportToPDF}>Export PDF</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Invoice Number or Account Number..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
        />
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('invoiceNumber')}>Invoice Number</th>
            <th onClick={() => requestSort('accountNumber')}>Account Number</th>
            <th onClick={() => requestSort('Rates')}>Rates Amount (R)</th>
            <th onClick={() => requestSort('Electricity')}>Electricity Amount (R)</th>
            <th onClick={() => requestSort('Water')}>Water Amount (R)</th>
            <th onClick={() => requestSort('Refuse')}>Refuse Amount (R)</th>
            <th onClick={() => requestSort('Sewer')}>Sewer Amount (R)</th>
            <th onClick={() => requestSort('totalAmount')}>Total Amount (R)</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((inv, index) => (
            <tr key={index}>
              <td>{cleanInvoiceNumber(inv.invoiceNumber)}</td>
              <td>{formatMonthDayYear(inv.dueDate)}</td>
              <td>{formatCurrency(inv.breakdown?.Rates || 0)}</td>
              <td>{formatCurrency(inv.breakdown?.Electricity || 0)}</td>
              <td>{formatCurrency(inv.breakdown?.Water || 0)}</td>
              <td>{formatCurrency(inv.breakdown?.Refuse || 0)}</td>
              <td>{formatCurrency(inv.breakdown?.Sewer || 0)}</td>
              <td>{formatCurrency(inv.totalAmount)}</td>
              <td>
                <button onClick={() => downloadInvoicePDF(inv)} className="download-btn">
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoicesPage;
