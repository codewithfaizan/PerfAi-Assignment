import React from 'react';

const TaskStatus = ({ onStatusChange }) => {
  return (
    <div>
      <h2>Filter by Status</h2>
      <select onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskStatus;
