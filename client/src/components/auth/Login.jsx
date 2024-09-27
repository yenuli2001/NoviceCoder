import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/user';
import './login.css';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage3 from '../../assets/images/img5.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector(state => state.user);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    navigate('/home');
  }

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '1', display: 'flex' }}>
          
          {/* Left Side: Image */}
          <div className="left-side-image" style={{ flex: '1', position: 'relative', minHeight: '100vh' }}>
            <img
              src={backgroundImage3}
              alt="Profile Background"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(80%)', height: '100%' }} 
            />
          </div>

          {/* Right Side: Form */}
          
          <div className="right-side-form" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <div style={{ width: '80%' }} className="max-w-md p-8 bg-orange-100 border border-gray-300 shadow-md rounded-xl"> {/* Increased mt for more spacing */}
            <div style={{ width: '99%' }} className="max-w-md p-8 bg-gray-800 border border-gray-300 shadow-md rounded-xl">
              <h1 className="text-4xl font-bold text-center mb-10 text-white">Login</h1>

              <form onSubmit={submitHandler} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white transition duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-600 transform hover:scale-105">
                  Login
                </button>
                <div className="flex justify-between mt-4 text-sm text-blue-500">
                  <Link to="/forgetpassword" className="hover:underline" style={{color: 'lightblue'}}>
                    Forget Password
                  </Link>
                  <Link to="/register" className="hover:underline" style={{color: 'lightblue'}}>
                    Don't have an account?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
