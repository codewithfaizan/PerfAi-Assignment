import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/property/add', {
        name,
        location,
        type: propertyType,
      });

      onAdd(response.data.property); 
      setName('');
      setLocation('');
      setPropertyType('');
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <div>
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Property Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          value={location}
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required>
          <option value="">Select Type</option>
          <option value="Mosque">Mosque</option>
          <option value="School">School</option>
          <option value="Land">Land</option>
        </select>
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
