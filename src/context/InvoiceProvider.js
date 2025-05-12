// src/context/InvoiceProvider.js

import React, { useState, useEffect } from 'react';
import InvoiceContext from './InvoiceContext';

/**
 * Helper function to compute `difference` and `percentageChange`
 * for each invoice. Assumes invoices are sorted by month ascending.
 */
function computeDifferences(invoices) {
  return invoices.map((inv, index, arr) => {
    if (index === 0) {
      return { ...inv, difference: 0, percentageChange: 0 };
    }
    const prevTotal = arr[index - 1].totalAmount || 0;
    const diff = inv.totalAmount - prevTotal;
    const pct = prevTotal === 0 ? 0 : (diff / prevTotal) * 100;
    return {
      ...inv,
      difference: diff,
      percentageChange: parseFloat(pct.toFixed(2))
    };
  });
}

const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        setLoading(true);

        // Fetch from public folder e.g. /mockData/invoices.json
        const response = await fetch('/mockData/invoices.json');
        if (!response.ok) {
          throw new Error(`Network error: ${response.status}`);
        }

        let data = await response.json();
        if (!Array.isArray(data)) data = [];

        // Sort by `month`
        data.sort((a, b) => (a.month > b.month ? 1 : -1));

        // Compute differences
        const transformed = computeDifferences(data);

        setInvoices(transformed);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    

    fetchInvoices();
  }, []);

  // Provide the full invoice array plus loading/error states
  return (
    <InvoiceContext.Provider value={{ invoices, loading, error }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
