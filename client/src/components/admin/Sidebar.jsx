import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';

const Sidebar = () => {
  return (
    <div style={{
      marginTop:15,
      minHeight: '30vh',
      backgroundColor: '#845695',
      padding: '20px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column', // Stack items vertically
      gap: '10px', // Space between items
    }}>
      <LinkButton url="dashboard" icon={RiDashboardFill} text="Dashboard" />
      <LinkButton url="createcourse" icon={RiAddCircleFill} text="Create Course" />
      <LinkButton url="courses" icon={RiEyeFill} text="Courses" />
      <LinkButton url="users" icon={RiUser3Fill} text="Users" />
    </div>
  );
};

export default Sidebar;

function LinkButton(props) {
  return (
    <div>
      <Link to={`/admin/${props.url}`} className="block">
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '10px',
            color: '#4A5568', // gray-700
            backgroundColor: 'white',
            border: '1px solid #D2D6DC', // gray-300
            borderRadius: '4px',
            transition: 'background-color 0.2s',
            marginBottom: '10px', // Space below each button
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EDF2F7')} // gray-200
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
        >
          <props.icon style={{ marginRight: '8px' }} />
          {props.text}
        </button>
      </Link>
    </div>
  );
}
