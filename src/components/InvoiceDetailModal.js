import React from 'react';
import './InvoiceDetailModal.css';

const InvoiceDetailModal = ({ invoice, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="invoice-detail-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Invoice Details</h2>
        <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Month:</strong> {invoice.month}</p>
        <p><strong>Account Number:</strong> {invoice.accountNumber}</p>
        <p><strong>Total Amount:</strong> R {invoice.totalAmount}</p>
        <p><strong>Status:</strong> {invoice.status}</p>
        <p><strong>Due Date:</strong> {invoice.dueDate}</p>
        {/* Additional detailed information can be added here */}
      </div>
    </div>
  );
};

export default InvoiceDetailModal;
