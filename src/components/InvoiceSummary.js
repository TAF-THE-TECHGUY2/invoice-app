// src/components/InvoiceSummary.js
import React, { useMemo } from 'react';
import './InvoiceSummary.css';

const InvoiceSummary = ({ invoices }) => {
  // Aggregate values across invoices.
  const summary = useMemo(() => {
    let totalAmount = 0;
    let totalRates = 0;
    let totalElectricity = 0;
    let totalWater = 0;
    let totalRefuse = 0;
    let totalSewer = 0;
    invoices.forEach(inv => {
      totalAmount += inv.totalAmount || 0;
      if (inv.breakdown) {
        totalRates += inv.breakdown.Rates || 0;
        totalElectricity += inv.breakdown.Electricity || 0;
        totalWater += inv.breakdown.Water || 0;
        totalRefuse += inv.breakdown.Refuse || 0;
        totalSewer += inv.breakdown.Sewer || 0;
      }
    });
    return { totalAmount, totalRates, totalElectricity, totalWater, totalRefuse, totalSewer };
  }, [invoices]);

  const formatCurrency = (num) =>
    'R' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <div className="invoice-summary">
      <div className="summary-card">
        <h4>Total Amount</h4>
        <p>{formatCurrency(summary.totalAmount)}</p>
      </div>
      <div className="summary-card">
        <h4>Rates Amount</h4>
        <p>{formatCurrency(summary.totalRates)}</p>
      </div>
      <div className="summary-card">
        <h4>Electricity Amount</h4>
        <p>{formatCurrency(summary.totalElectricity)}</p>
      </div>
      <div className="summary-card">
        <h4>Water Amount</h4>
        <p>{formatCurrency(summary.totalWater)}</p>
      </div>
      <div className="summary-card">
        <h4>Refuse Amount</h4>
        <p>{formatCurrency(summary.totalRefuse)}</p>
      </div>
      <div className="summary-card">
        <h4>Sewer Amount</h4>
        <p>{formatCurrency(summary.totalSewer)}</p>
      </div>
    </div>
  );
};

export default InvoiceSummary;
