import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ properties, onAddTask }) => {
  const [propertyId, setPropertyId] = useState('');
  const [taskType, setTaskType] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/task/add', {
        propertyId,
        type: taskType,
        dueDate,
      });

      onAddTask(response.data.task); // Update parent component with the new task
      setPropertyId('');
      setTaskType('');
      setDueDate('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <select value={propertyId} onChange={(e) => setPropertyId(e.target.value)} required>
          <option value="">Select Property</option>
          {properties.map((property) => (
            <option key={property._id} value={property._id}>
              {property.propertyName}
            </option>
          ))}
        </select>
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)} required>
          <option value="">Select Task Type</option>
          <option value="Collect rent">Collect rent</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Follow-up on a legal issue">Follow-up on a legal issue</option>
        </select>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
