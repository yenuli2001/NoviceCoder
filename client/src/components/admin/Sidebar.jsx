import React from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';

const Sidebar = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col justify-center pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600">
      <LinkButton url="dashboard" icon={RiDashboardFill} text="Dashboard" />
      <LinkButton
        url="createcourse"
        icon={RiAddCircleFill}
        text="Create Course"
      />
      <LinkButton url="courses" icon={RiEyeFill} text="Courses" />
      <LinkButton url="users" icon={RiUser3Fill} text="Users" />
      </div>
    </>
  );
};

export default Sidebar;

function LinkButton(props) {
  return (
    <div className="mb-2">
      <Link to={`/admin/${props.url}`} className="block">
        <button className="flex items-center w-full p-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-200">
          <props.icon className="mr-2" />
          {props.text}
        </button>
      </Link>
    </div>
  );
}
