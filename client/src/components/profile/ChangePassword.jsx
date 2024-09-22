import { useEffect, useState } from 'react';
import './profile.css';
import { changepassword } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage from '../../assets/images/img5.jpeg';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  const changePassword = (e) => {
    e.preventDefault();
    dispatch(changepassword(oldPassword, newPassword));
  };

  return (
    <>
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', display: 'flex' }}>
        {/* Left Side: Image */}
        <div className="left-side-image" style={{ flex: 1, position: 'relative' }}>
          <img
            src={backgroundImage}
            alt="Profile Background"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(80%)', height: '100vh' }}
          />
        </div>

        {/* Right Side: Form */}
        <div className="right-side-form" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '80%' }} className="max-w-md p-8 bg-orange-100 border border-gray-300 shadow-lg rounded-xl">
            <form onSubmit={changePassword} className="bg-gray-800 text-center border border-gray-400 shadow-lg p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Change Password</h1>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Old Password..."
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-3 mb-4 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  style={{ color: '#000', backgroundColor: '#fff', borderRadius: 5, borderWidth: '2px' }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="New Password..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 mb-4 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  style={{ color: '#000', backgroundColor: '#fff', borderRadius: 5, borderWidth: '2px' }}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-600 transform hover:scale-105"
                style={{ borderRadius: 5 }}
              >
                Change Password
              </button>
              <div className="text-center mt-4">
              <Link to="/profile" className="text-indigo-500 hover:underline" style={{color: 'lightblue'}}>
                Back to profile
              </Link>
            </div>
            </form>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
