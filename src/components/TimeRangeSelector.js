// src/components/TimeRangeSelector.js
import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import '../styles/TimeRangeSelector.css';

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
  const ranges = [3, 6, 12];

  return (
    <div className="time-range-selector">
      <div className="selector-header">
        <FiCalendar className="calendar-icon" />
        <span>Select Time Range:</span>
      </div>
      <div className="range-buttons">
        {ranges.map((r) => (
          <button
            key={r}
            className={`range-button ${selectedRange === r ? 'active' : ''}`}
            onClick={() => onRangeChange(r)}
          >
            Last {r} Months
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;
