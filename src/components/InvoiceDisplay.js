import React, { useContext } from 'react';
import InvoiceContext from '../context/InvoiceContext';
import '../styles/InvoiceDisplay.css'; 

const InvoiceDisplay = () => {
  const { invoice } = useContext(InvoiceContext);

  const handleRetrieve = () => {
    const storedInvoice = JSON.parse(localStorage.getItem('cojInvoice'));
    alert(`Stored Invoice: ${JSON.stringify(storedInvoice, null, 2)}`);
  };

  return (
    <div className="invoice-container">
      <h2 className="invoice-title">COJ Invoice Details</h2>
      {invoice.accountNumber ? (
        <div className="invoice-details">
          <p><strong>Account Number:</strong> {invoice.accountNumber}</p>
          <p><strong>Rates Amount:</strong> {invoice.ratesAmount}</p>
          <p><strong>Water Amount:</strong> {invoice.waterAmount}</p>
          <p><strong>Electricity Amount:</strong> {invoice.electricityAmount}</p>
          <p><strong>Refuse Amount:</strong> {invoice.refuseAmount}</p>
          <p><strong>Sewer Amount:</strong> {invoice.sewerAmount}</p>
          <p className="total-amount"><strong>Total Amount:</strong> {invoice.totalAmount}</p>
          <button className="button" onClick={handleRetrieve}>
            Retrieve from LocalStorage
          </button>
        </div>
      ) : (
        <p>Loading invoice data...</p>
      )}
    </div>
  );
};

export default InvoiceDisplay;
