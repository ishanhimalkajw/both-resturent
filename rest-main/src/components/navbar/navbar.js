import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-end items-center">
          {/* Left side - Logo or brand */}
          {/* <Link to="/" className="text-gray-800 text-2xl font-bold">
            Your Logo/Brand
          </Link> */}

          {/* Right side - Navigation links and logout */}
          {isLoggedIn && (
            <div className="flex space-x-4">
              {/* Example navigation links */}
              {/* <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
                Dashboard
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-800">
                Profile
              </Link> */}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
