// src/context/InvoiceContext.js
import React, { createContext, useState, useEffect } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  // Fetch invoice data from backend API or static file in public folder
  useEffect(() => {
    fetch('http://localhost:5000/api/invoices')
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((error) => console.error('Error loading invoice data', error));
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
