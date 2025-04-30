import React from 'react';
import './SummaryCards.css';

const SummaryCards = () => {
  // Dummy static data; in a real app, this data would come from state or context.
  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Amount</h3>
        <p>R 100,000</p>
      </div>
      <div className="card">
        <h3>Number of Invoices</h3>
        <p>25</p>
      </div>
      <div className="card">
        <h3>Average Monthly Spend</h3>
        <p>R 4,000</p>
      </div>
      <div className="card">
        <h3>Biggest Increase</h3>
        <p>R 1,200</p>
      </div>
      <div className="card">
        <h3>Biggest Decrease</h3>
        <p>R 800</p>
      </div>
    </div>
  );
};

export default SummaryCards;
