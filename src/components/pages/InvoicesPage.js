import React, { useContext, useState, useMemo } from 'react';
import InvoiceContext from '../../context/InvoiceContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './InvoicesPage.css';

const cleanInvoiceNumber = (invoiceNumber) => {
  if (!invoiceNumber) return 'N/A';
  return invoiceNumber.replace(/Next$/i, '').trim();
};

const formatCurrency = (number) => {
  if (number === null || number === undefined) return 'R0.00';
  return 'R' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

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
  const { invoices } = useContext(InvoiceContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      cleanInvoiceNumber(invoice.invoiceNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.dueDate || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const sortedInvoices = useMemo(() => {
    let sortable = [...filteredInvoices];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
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

  const exportToCSV = () => {
    const header = [
      'Invoice Number',
      'Date',
      'Rates Amount',
      'Electricity Amount',
      'Water Amount',
      'Refuse Amount',
      'Total Amount',
      'Previous Balance',
      'Payment Status',
      'Balance Difference'
    ];
    const rows = sortedInvoices.map((inv) => [
      cleanInvoiceNumber(inv.invoiceNumber),
      formatMonthDayYear(inv.dueDate),
      formatCurrency(inv.breakdown?.Rates || 0),
      formatCurrency(inv.breakdown?.Electricity || 0),
      formatCurrency(inv.breakdown?.Water || 0),
      formatCurrency(inv.breakdown?.Refuse || 0),
      formatCurrency(inv.breakdown?.Sewer || 0),
      formatCurrency(inv.totalAmount || 0),
      formatCurrency(inv.previousBalance || 0),
      inv.paymentStatus || '',
      formatCurrency(inv.balanceDifference || 0)
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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Invoice Report', 14, 16);
    const tableData = sortedInvoices.map((inv) => [
      cleanInvoiceNumber(inv.invoiceNumber),
      formatMonthDayYear(inv.dueDate),
      formatCurrency(inv.breakdown?.Rates || 0),
      formatCurrency(inv.breakdown?.Electricity || 0),
      formatCurrency(inv.breakdown?.Water || 0),
      formatCurrency(inv.breakdown?.Refuse || 0),
      formatCurrency(inv.breakdown?.Sewer || 0),
      formatCurrency(inv.totalAmount || 0),
      formatCurrency(inv.previousBalance || 0),
      inv.paymentStatus || '',
      formatCurrency(inv.balanceDifference || 0)
    ]);

    doc.autoTable({
      startY: 22,
      head: [[
        'Invoice #', 'Date', 'Rates', 'Electricity',
        'Water', 'Refuse',  'Total', 'Prev. Balance', 'Status', 'Balance Diff'
      ]],
      body: tableData,
      styles: { fontSize: 8 },
    });

    doc.save('invoices.pdf');
  };

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

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Invoice Number or Date"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="export-buttons">
        <button onClick={exportToCSV}>Export CSV</button>
        <button onClick={exportToPDF}>Export PDF</button>
      </div>

      <div className="table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('invoiceNumber')}>Invoice</th>
              <th onClick={() => requestSort('dueDate')}>Date</th>
              <th>Rates</th>
              <th>Electricity</th>
              <th>Water</th>
              <th>Refuse</th>
              <th>Total</th>
              <th>Prev. Bal</th>
              <th>Status</th>
              
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {paginatedInvoices.map((inv, index) => (
              <tr
                key={index}
                className={inv.totalAmount > 100000 ? 'highlight-row' : ''}
              >
                <td>{cleanInvoiceNumber(inv.invoiceNumber)}</td>
                <td>{formatMonthDayYear(inv.dueDate)}</td>
                <td>{formatCurrency(inv.breakdown?.Rates || 0)}</td>
                <td>{formatCurrency(inv.breakdown?.Electricity || 0)}</td>
                <td>{formatCurrency(inv.breakdown?.Water || 0)}</td>
                <td>{formatCurrency(inv.breakdown?.Refuse || 0)}</td>
                <td>{formatCurrency(inv.totalAmount)}</td>
                <td>{formatCurrency(inv.previousBalance || 0)}</td>
                <td>
                  <span className={`status-badge ${inv.paymentStatus === 'Paid' ? 'paid' : 'unpaid'}`}>
                    {inv.paymentStatus === 'Paid' ? '✅ Paid' : '❌ Not Paid'}
                  </span>
                </td>
               
                <td>
                  <button onClick={() => downloadInvoicePDF(inv)} className="download-btn">
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default InvoicesPage;
