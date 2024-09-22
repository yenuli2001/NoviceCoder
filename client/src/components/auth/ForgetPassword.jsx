import { useEffect, useState } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage1 from '../../assets/images/img5.jpeg';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const { message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
    toast.error('Sorry this is a demo site');
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
  }, [dispatch, error, message]);

  return (
    <>
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', display: 'flex' }}>
        {/* Left Side: Image */}
        <div className="left-side-image" style={{ flex: '1', position: 'relative' }}>
          <img
            src={backgroundImage1}
            alt="Background Image"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(80%)', height: '100vh' }}
          />
        </div>

        {/* Right Side: Form */}
        <div className="right-side-form" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80%' }} className="max-w-md p-8 bg-orange-100 border border-gray-300 shadow-md rounded-xl"> {/* Increased mt for more spacing */}
          <div style={{ width: '99%' }} className="max-w-md p-8 bg-gray-800 border border-gray-300 shadow-md rounded-xl">
            <h1 className="text-4xl font-bold text-center mb-10 text-white">Forget Password</h1>

            <form onSubmit={submitHandler} className="space-y-4">
              <input
                type="email"
                placeholder="Email Address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-600 transform hover:scale-105">
                Send Link
              </button>
            </form>

            <div className="text-center mt-4">
              <Link to="/login" className="text-indigo-500 hover:underline" style={{color: 'lightblue'}}>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgetPassword;
