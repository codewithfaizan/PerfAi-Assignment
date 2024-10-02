import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onUpdateStatus, onDeleteTask }) => {
  const handleStatusUpdate = async (taskId, status) => {
    try {
      const response = await axios.patch(`/api/task/update/${taskId}`, { status });
      onUpdateStatus(response.data.task); // Update parent component with the updated task status
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/task/delete/${taskId}`);
      onDeleteTask(taskId); // Update parent component with task deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <p>Property: {task.property}</p>
            <p>Type: {task.type}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleStatusUpdate(task._id, 'Pending')}>Pending</button>
            <button onClick={() => handleStatusUpdate(task._id, 'In Progress')}>In Progress</button>
            <button onClick={() => handleStatusUpdate(task._id, 'Completed')}>Completed</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
