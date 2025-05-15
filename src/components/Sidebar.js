import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaFileInvoice,
  FaUserFriends, // ⬅️ Add this import
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Municipal Dashboard</h2>
      <ul>
        <li>
          <Link to="/">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/analytics">
            <FaChartLine /> Analytics
          </Link>
        </li>
        <li>
          <Link to="/invoices">
            <FaFileInvoice /> Invoices
          </Link>
        </li>
        <li>
          <Link to="/usage-trends">
            <MdTrendingUp /> Usage Trends
          </Link>
        </li>
        <li>
          <Link to="/synced-accounts">
            <FaUserFriends /> Synced Accounts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
