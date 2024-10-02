import React, { useState, useEffect } from 'react';
import AddProperty from '../components/AddProperty';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import OverdueTasks from '../components/OverdueTasks';
import axios from 'axios';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/property/all', { withCredentials: true });
        setProperties(response.data.properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/task/getall', { withCredentials: true });
        setTasks(response.data.Tasks);
        setFilteredTasks(response.data.Tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchProperties();
    fetchTasks();
  }, []);

  const handleAddProperty = async (newProperty) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/property/add',
        newProperty,
        { withCredentials: true }
      );
      setProperties([...properties, response.data.newProperty]);
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/task/add',
        newTask,
        { withCredentials: true }
      );
      setTasks([...tasks, response.data.task]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTaskStatus = async (updatedTask) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/auth/task/update/${updatedTask._id}`,
        { status: updatedTask.status },
        { withCredentials: true }
      );
      const updatedTasks = tasks.map((task) =>
        task._id === response.data.task._id ? response.data.task : task
      );
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/auth/task/delete/${taskId}`, { withCredentials: true });
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Waqf Property Task Tracker</h1>
      <div className="row">
        <div className="col-md-6">
          <AddProperty onAdd={handleAddProperty} />
        </div>
        <div className="col-md-6">
          <AddTask properties={properties} onAddTask={handleAddTask} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <TaskList
            tasks={filteredTasks}
            onUpdateStatus={handleUpdateTaskStatus}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <OverdueTasks tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Home;
