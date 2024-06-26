import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://109.199.101.207:3000/api/login', formData);
      
      if (response.status === 200) {
        // Dispatch the login action and store token in local storage
        dispatch(login(response.data));
        localStorage.setItem('token', response.data.token);  // Store the token

        // Navigate based on user role from the response data
        const { role } = response.data;
        switch (role) {
          case 'admin':
            navigate('/admin-dashboard');
            break;
          case 'manager':
            navigate('/manager-dashboard');
            break;
          case 'chef':
            navigate('/chef-dashboard');
            break;
          case 'waiter':
            navigate('/waiter-dashboard');
            break;
          case 'supplier':
            navigate('/supplier-dashboard');
            break;
          case 'user':
            navigate('/menu');
            break;
          default:
            navigate('/menu');
            break;
        }
      } else {
        console.error('Login failed: ', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during login: ', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        Are you a new customer? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
