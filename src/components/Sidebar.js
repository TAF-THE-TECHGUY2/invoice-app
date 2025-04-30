import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaChartLine, FaFileInvoice } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>CoJ Dashboard</h2>
      <ul>
        <li>
          <Link to="/"><FaTachometerAlt /> Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics"><FaChartLine /> Analytics</Link>
        </li>
        <li>
          <Link to="/invoices"><FaFileInvoice /> Invoices</Link>
        </li>
        <li>
          <Link to="/usage-trends"><MdTrendingUp /> Usage Trends</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
