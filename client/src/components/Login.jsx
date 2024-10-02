import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
     
      const response = await axios.post(
        'http://localhost:3000/auth/login', 
        { email, password },
        { withCredentials: true } 
      );

      if (response.data.success) {
        navigate('/');
      } else {
        setError(response.data.error || 'Invalid email or password');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form onSubmit={handleLogin} className="w-50 mx-auto p-4 border rounded shadow">
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
