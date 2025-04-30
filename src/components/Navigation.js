import React from 'react';
import { FaChartPie } from 'react-icons/fa'; // Example icon
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaChartPie className="app-icon" />
        Invoice Analytics
      </div>
      <ul className="nav-links">
        <li><a href="#summary">Summary</a></li>
        <li><a href="#trends">Trends</a></li>
        <li><a href="#details">Details</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
