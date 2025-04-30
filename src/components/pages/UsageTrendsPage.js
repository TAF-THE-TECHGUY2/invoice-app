// src/pages/UsageTrendsPage.js
import React from 'react';
import UsageTrendChart from '../UsageTrendChart';
import UsageComparisonChart from '../UsageComparisonChart';
import UsageDataTable from '../UsageDataTable';
import './UsageTrendChart.css';

const UsageTrendsPage = () => {
  return (
    <div className="usage-trends-page">
      <h1>Usage Trends</h1>
      
      <UsageTrendChart />
      
      
      <UsageComparisonChart />

      
      <UsageDataTable />
    </div>
  );
};

export default UsageTrendsPage;
