// src/components/UsageDataTable.js
import React from 'react';
import './UsageDataTable.css';

const UsageDataTable = () => {
  const data = [
    { month: 'Jan', water: 50, electricity: 300, sewer: 200 },
    { month: 'Feb', water: 70, electricity: 250, sewer: 180 },
    { month: 'Mar', water: 60, electricity: 280, sewer: 220 },
    { month: 'Apr', water: 80, electricity: 320, sewer: 240 },
    { month: 'May', water: 90, electricity: 310, sewer: 210 },
    { month: 'Jun', water: 75, electricity: 290, sewer: 230 },
  ];

  return (
    <div className="usage-data-table">
      <h2>Monthly Usage Details</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Water (KL)</th>
            <th>Electricity (kWh)</th>
            <th>Sewer (Amount)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.month}</td>
              <td>{row.water}</td>
              <td>{row.electricity}</td>
              <td>{row.sewer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsageDataTable;
