import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import './RangeSelector.css';

const RangeSelector = ({ range, setRange }) => {
  const options = [
    { label: "Latest Month", value: 1 },
    { label: "3 Months", value: 3 },
    { label: "6 Months", value: 6 },
    { label: "9 Months", value: 9 },
    { label: "12 Months", value: 12 },
  ];

  return (
    <div className="range-selector">
      <FiCalendar className="calendar-icon" />
      {options.map(option => (
        <button
          key={option.value}
          className={`range-button ${range === option.value ? 'active' : ''}`}
          onClick={() => {
            console.log("Setting range to:", option.value);
            setRange(option.value);
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default RangeSelector;
