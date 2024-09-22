import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import Loader from '../../layout/loader/Loader';
import Footer from '../../layout/Footer';
import backgroundImage1 from './../../../assets/images/img5.jpeg'; // Import your header image
import { useDispatch, useSelector } from 'react-redux';
import { dashboardStats } from '../../../redux/actions/admin';
import { Link } from 'react-router-dom';
import {
  RiEditFill,
  RiKeyFill,
  RiSettings5Fill,
} from 'react-icons/ri';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(dashboardStats());
  }, [dispatch]);

  return (
    <>
      {/* Header Image */}
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', paddingBottom: '40px' }}>
        <img
          src={backgroundImage1}
          alt="Header"
          className="w-full h-64 object-cover"
          style={{ marginBottom: '20px' }}
        />

        <div style={styles.dashboardContainer}>
          {loading ? (
            <Loader />
          ) : (
            <div style={styles.dashboardContent}>
              <div style={styles.mainContent}>
                <h1 className="text-5xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', color: 'black' }}>
                  Dashboard
                </h1>
                <p>{`Last Change was on ${String(new Date()).split('G')[0]}`}</p>

                {/* Profile Navigation Buttons */}
                <div style={styles.buttonContainer}>
                  <Link to="/profile">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                      Profile
                    </button>
                  </Link>
                  <Link to="/contact">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                      Contact
                    </button>
                  </Link>
                  <Link to="/courses">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                      All Courses
                    </button>
                  </Link>
                </div>
              </div>

              <div style={styles.sidebar}>
                <Sidebar />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;

const styles = {
  dashboardContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1400px',
    padding: '20px',
    margin: '0 auto', // Center the container
  },
  dashboardContent: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between', // Space between main content and sidebar
  },
  mainContent: {
    flex: 3,
    paddingRight: '20px',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#000',
  },
  sidebar: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#2d3748', // bg-gray-800
    border: '1px solid #4a5568', // border-gray-600
    borderRadius: '8px', // Rounded corners
    padding: '20px', // Add some padding
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row', // Arrange buttons in a row
    gap: '10px', // Space between buttons
    marginTop: '20px', // Space above buttons
  },
};
