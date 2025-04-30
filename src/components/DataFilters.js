import React from 'react';
import './DataFilters.css';

const DataFilters = ({ dateRange, setDateRange }) => {
  const handleChange = (e) => {
    setDateRange(parseInt(e.target.value, 10));
  };

  return (
    <div className="data-filters">
      <label htmlFor="dateRange">Select Date Range (in months):</label>
      <select id="dateRange" value={dateRange} onChange={handleChange}>
        <option value="3">Last 3 Months</option>
        <option value="6">Last 6 Months</option>
        <option value="12">Last 12 Months</option>
      </select>
    </div>
  );
};

export default DataFilters;
