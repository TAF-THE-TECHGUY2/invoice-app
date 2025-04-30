import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="notifications">
        <i className="fas fa-bell"></i>
      </div>
    </div>
  );
};

export default Topbar;
