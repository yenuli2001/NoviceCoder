import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import './user.css';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, deleteUser, updateUserRole } from '../../../redux/actions/admin';
import Loader from '../../layout/loader/Loader';
import { toast } from 'react-hot-toast';
import Footer from '../../layout/Footer';
import backgroundImage1 from '../../../assets/images/img5.jpeg'; // Change the filename to your actual image

const User = () => {
  const { users, loading, error, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const updatehandler = (userId) => {
    dispatch(updateUserRole(userId));
  };

  const deletehandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(allUsers());
  }, [dispatch, error, message]);

  return (
    <>
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', paddingBottom: '40px' }}>
        <img
          src={backgroundImage1}
          alt="Header"
          className="w-full h-64 object-cover"
          style={{ marginBottom: '20px' }}
        />

        {loading ? (
          <Loader />
        ) : (
          <div className="userContainer flex">
            <div className="user flex-grow">
              <h1 style={{ marginTop: 20, marginBottom:10, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', color: 'black' }} className="text-5xl font-bold text-white">All Users</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-purple-700 text-white text-left text-sm uppercase font-semibold tracking-wider">
                      <th className="py-4 px-6 text-center">ID</th>
                      <th className="py-4 px-6 text-center">Name</th>
                      <th className="py-4 px-6 text-center">Email</th>
                      <th className="py-4 px-6 text-center">Role</th>
                      <th className="py-4 px-6 text-center">Action</th> {/* Removed Subscription column */}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(users) &&
                      users.map((item) => (
                        <Row
                          updatehandler={updatehandler}
                          deletehandler={deletehandler}
                          key={item._id}
                          item={item}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sidebar">
              <Sidebar />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default User;

function Row({ item, deletehandler, updatehandler }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-purple-50 transition-colors duration-200">
      <td className="py-4 px-6 text-gray-700">{item._id}</td>
      <td className="py-4 px-6">{item.name}</td>
      <td className="py-4 px-6">{item.email}</td>
      <td className="py-4 px-6">
        <span className={`font-semibold ${item.role === 'Admin' ? 'text-green-500' : 'text-yellow-500'}`}>
          {item.role}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          <button
            onClick={() => updatehandler(item._id)}
            className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition duration-300 transform hover:scale-105"
          >
            Change Role
          </button>
          <button
            onClick={() => deletehandler(item._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
