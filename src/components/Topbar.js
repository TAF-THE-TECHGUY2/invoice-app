// src/components/Topbar.js
import React, { useContext } from 'react';
import InvoiceContext from '../context/InvoiceContext';
import './Topbar.css';

const Topbar = () => {
  const { invoices, selectedAccount, setSelectedAccount } = useContext(InvoiceContext);

  const uniqueAccounts = [...new Set(invoices.map(inv => inv.accountNumber))];

  return (
    <div className="topbar">
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="account-dropdown">
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          <option value="">All Accounts</option>
          {uniqueAccounts.map((acc, idx) => (
            <option key={idx} value={acc}>{acc}</option>
          ))}
        </select>
      </div>
      <div className="notifications">
        <i className="fas fa-bell"></i>
      </div>
    </div>
  );
};

export default Topbar;
