// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';  // Import the toast module

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to log in the user
      const response = await axios.post('http://localhost:2345/api/users/login', { email, password });

      // Store the token in local storage or a state management solution
      sessionStorage.setItem('token', response.data.token);

      // Display success notification
      toast.success('Login successful!');

      // Optionally, you can redirect to the home page or handle the response accordingly
      navigate('/home');
    } catch (error) {
      console.error(error);

      // Display error notification
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form5">
        <label className="login-label5">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="login-input5" />

        <label className="login-label5">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="login-input5" />

        <button type="submit" className="login-button5">Login</button>
      </form>

      <p className="register-link5">
        Not Yet Registered? <Link to="/register" className="register-link5">Register</Link>
      </p>
    </div>
  );
};

export default Login;
