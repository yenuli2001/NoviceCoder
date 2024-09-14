import { RiDashboardFill, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';

const Header = ({ isAuthenticated = false, user }) => {
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  const logoutHandler = () => {
    handleClick();
    dispatch(logout());
  };

  const handleOutsideClick = event => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isActive]);

  return (
    <>
      <div className="flex items-center justify-between p-4 text-white bg-gray-800">
        <button onClick={handleClick} className="text-2xl">
          <RiMenu5Fill />
        </button>
      </div>
      <div
        ref={sidebarRef}
        className={`headerContainer ${
          isActive ? 'active' : ''
        } bg-gray-900 text-white transition-transform transform ${
          isActive ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 h-full w-64 z-50`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <div className="space-y-2">
            <Link
              onClick={handleClick}
              to="/"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              onClick={handleClick}
              to="/courses"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              All Courses
            </Link>
            <Link
              onClick={handleClick}
              to="/request"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Request for a Course
            </Link>
            <Link
              onClick={handleClick}
              to="/about"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              About
            </Link>
            <Link
              onClick={handleClick}
              to="/contact"
              className="block px-4 py-2 transition duration-300 rounded hover:bg-gray-700"
            >
              Contact
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="space-y-2">
              <Link
                onClick={handleClick}
                to="/profile"
                className="block px-4 py-2 transition duration-300 rounded hover:bg-gray-700"
              >
                Profile
              </Link>
              <span className="block text-center text-gray-400">OR</span>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 transition duration-300 transform bg-red-500 rounded hover:bg-red-600 hover:scale-105"
              >
                LogOut
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                onClick={handleClick}
                to="/login"
                className="block px-4 py-2 transition duration-300 bg-blue-500 rounded hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          )}

          {user && user.role === 'admin' && (
            <Link
              onClick={handleClick}
              to="/admin/dashboard"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              <button className="flex items-center space-x-2">
                <RiDashboardFill />
                <span>Dashboard</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
