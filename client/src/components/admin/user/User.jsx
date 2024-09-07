import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import './user.css';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, deleteUser, updateUserRole } from '../../../redux/actions/admin';
import Loader from '../../layout/loader/Loader';
import { toast } from 'react-hot-toast';
import Footer from '../../layout/Footer';



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
      <div className="min-h-screen flex flex-col justify-center pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600">
        {loading ? (
          <Loader />
        ) : (
          <div className="userContainer flex">
            <div className="user flex-grow">
              <h1 className="text-3xl font-bold mb-6 text-black">All Users</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-indigo-200 rounded-lg shadow-lg">
                  <thead className="bg-gray-200 text-black uppercase text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-6 text-left">ID</th>
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Role</th>
                      <th className="py-3 px-6 text-left">Subscription</th>
                      <th className="py-3 px-6 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-black text-sm font-light">
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
      <Footer/>
    </>
  );
};

export default User;

function Row({ item, deletehandler, updatehandler }) {
  return (
    <tr className="border-b border-black hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <span className="font-medium">{item._id}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{item.name}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span>{item.email}</span>
      </td>
      <td className="py-3 px-6 text-left">
        <span
          className={`${
            item.role === 'Admin' ? 'text-green-600' : 'text-yellow-600'
          }`}
        >
          {item.role}
        </span>
      </td>
      <td className="py-3 px-6 text-left">
        <span
          className={`${
            item.subscription && item.subscription.status === 'Active'
              ? 'text-green-500'
              : 'text-red-500'
          }`}
        >
          {item.subscription && item.subscription.status === 'Active'
            ? 'Active'
            : 'Not Active'}
        </span>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex item-center justify-start space-x-2">
          <button
            onClick={() => updatehandler(item._id)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Change Role
          </button>
          <button
            onClick={() => deletehandler(item._id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
