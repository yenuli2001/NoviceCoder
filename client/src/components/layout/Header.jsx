import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { RiDashboardFill, RiMenu5Fill, RiCloseLine } from 'react-icons/ri';

const Header = ({ isAuthenticated = false, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsOpen(!isOpen);

  const logoutHandler = () => {
    toggleMenu();
    dispatch(logout());
  };

  const MenuItem = ({ to, onClick, children }) => (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2 text-gray-300 transition-all duration-300 rounded-md hover:bg-indigo-600 hover:text-white"
    >
      {children}
    </Link>
  );

  return (
    <>
      <header className="text-white bg-gray-900 ">
        <div className="flex items-center justify-between px-4 py-3 mx-auto ">
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
          >
            NoviceCoder
          </Link>
          <button
            onClick={toggleMenu}
            className="p-1 text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isOpen ? <RiCloseLine /> : <RiMenu5Fill />}
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="p-1 text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <RiCloseLine />
            </button>
          </div>

          <div className="flex-grow px-4 py-2 space-y-2 overflow-y-auto">
            <MenuItem to="/" onClick={toggleMenu}>
              Home
            </MenuItem>
            <MenuItem to="/courses" onClick={toggleMenu}>
              All Courses
            </MenuItem>
            <MenuItem to="/request" onClick={toggleMenu}>
              Request a Course
            </MenuItem>
            <MenuItem to="/code-editor" onClick={toggleMenu}>
              Code Editor
            </MenuItem>
            <MenuItem to="/lobby" onClick={toggleMenu}>
              Live Streaming
            </MenuItem>
            <MenuItem to="/about" onClick={toggleMenu}>
              About
            </MenuItem>
            <MenuItem to="/contact" onClick={toggleMenu}>
              Contact
            </MenuItem>

            {user && user.role === 'admin' && (
              <MenuItem to="/admin/dashboard" onClick={toggleMenu}>
                <span className="flex items-center space-x-2">
                  <RiDashboardFill />
                  <span>Dashboard</span>
                </span>
              </MenuItem>
            )}

            {isAuthenticated ? (
              <>
                <MenuItem to="/profile" onClick={toggleMenu}>
                  Profile
                </MenuItem>
                <button
                  onClick={logoutHandler}
                  className="w-full px-4 py-2 transition-all duration-300 transform bg-red-500 rounded-md hover:bg-red-600 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <MenuItem to="/login" onClick={toggleMenu}>
                <span className="px-4 py-2 transition-all duration-300 bg-indigo-500 rounded-md hover:bg-indigo-600">
                  Login
                </span>
              </MenuItem>
            )}
          </div>

          <div className="p-4 text-center bg-gray-700">
            <p className="text-sm text-gray-400">
              &copy; 2023 NoviceCoder. All rights reserved.
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
