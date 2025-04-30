import React from 'react';
import './RecentActivity.css';

const RecentActivity = () => {
  const activities = [
    { id: 1, message: 'Invoice #1001 paid', time: '2 hours ago' },
    { id: 2, message: 'Invoice #1002 overdue', time: '1 day ago' },
    { id: 3, message: 'New invoice #1003 received', time: '3 days ago' },
  ];

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <ul>
        {activities.map((act) => (
          <li key={act.id}>
            <span>{act.message}</span>
            <span className="time">{act.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
