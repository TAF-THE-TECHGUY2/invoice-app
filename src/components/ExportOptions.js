import React from 'react';
import './ExportOptions.css';

const ExportOptions = ({ invoices }) => {
  const handleExport = (format) => {
    if (format === 'CSV') {
      const header = [
        'Invoice Number',
        'Due Date',
        'Account Number',
        'Total Amount',
        'Current Charges'
      ];
      const rows = invoices.map((inv) => [
        inv.invoiceNumber || 'N/A',
        inv.dueDate || '',
        inv.accountNumber || '',
        inv.totalAmount || '',
        inv.currentCharges || ''
      ]);
      const csvContent = [header, ...rows].map((e) => e.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'analytics_invoices.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'PDF') {
      alert('Export to PDF functionality to be implemented.');
    } else if (format === 'Image') {
      alert('Export as image functionality to be implemented.');
    }
  };

  return (
    <div className="export-options">
      <button onClick={() => handleExport('CSV')}>Export CSV</button>
      <button onClick={() => handleExport('PDF')}>Export PDF</button>
      <button onClick={() => handleExport('Image')}>Export Image</button>
    </div>
  );
};

export default ExportOptions;
