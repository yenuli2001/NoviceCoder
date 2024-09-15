import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/user';
import './login.css';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer'
import backgroundImage from '../../assets/images/img2.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector(state => state.user);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
    // toast.error('Sorry this is a demo site');
  };

  if (isAuthenticated) {
    navigate('/home');
  }

  if (error) {
    toast.error(error);
  }

  return (
    <>
    
      <div calssName="bg-gradient-to-r from-blue-500 to-purple-600 items-center">
        <img src={backgroundImage} alt="Description of image 2" className="w-full h-48 object-cover" style={{ marginTop: '5px', marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px', height: '300px' }} />
        <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>

        <div className="h-screen pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600 items-center">
          <div className="space-y-4 bg-indigo-200 text-center border border-gray rounded-lg shadow-lg" style={{ paddingTop: '50px', paddingBottom: '50px', margin: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
            <div className="flex justify-center">
              <div className="w-full max-w-md p-8 bg-white rounded shadow-md ">
                <h1 className="mb-6 text-3xl font-bold text-center">Login</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Login
                  </button>
                  <div className="flex justify-between mt-4 text-sm text-blue-500">
                    <Link to="/forgetpassword" className="hover:underline">
                      Forget Password
                    </Link>
                    <Link to="/register" className="hover:underline">
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

//login

export default Login;
