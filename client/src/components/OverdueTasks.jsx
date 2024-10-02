import React from 'react';

const OverdueTasks = ({ tasks }) => {
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== 'Completed'
  );

  return (
    <div>
      <h2>Overdue Tasks</h2>
      <ul>
        {overdueTasks.map((task) => (
          <li key={task._id}>
            <p>Property: {task.property}</p>
            <p>Type: {task.type}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverdueTasks;
