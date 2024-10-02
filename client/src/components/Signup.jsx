import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/signup',
        { userName, email, password, confirmPassword },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccess('Account created successfully! Please login.');
        setError('');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful signup
        }, 1500);
      } else {
        setError(response.data.error || 'Failed to create account. Please try again.');
      }
    } catch (error) {
      setError('Failed to create account. Please try again.');
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Signup</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && <div className="alert alert-success text-center">{success}</div>}
      <form onSubmit={handleSignup} className="w-50 mx-auto p-4 border rounded shadow">
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Signup
        </button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;
