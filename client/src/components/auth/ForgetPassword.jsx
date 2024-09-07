import { useEffect, useState } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage1 from '../../assets/images/img2.jpeg';

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
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 items-center">
        <img src={backgroundImage1} alt="Description of image 2" className="w-full h-48 object-cover" style={{ marginTop: '5px', marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px', height: '300px' }} />
        <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
      <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex items-center bg-indio-200 justify-center h-full">
          <div
            className="w-full max-w-md p-8"
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              width: '100%',
              maxWidth: '500px',
              height: '750px', // Adjusts height based on content
              margin: '0 20px' // Margin to prevent touching edges
            }}
          >
            <div className="loginContainer">
              <h1 className="mb-6 text-3xl font-bold text-center">Forget Password</h1>
              <form onSubmit={submitHandler}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#E19937', color: 'white', border: 'none', cursor: 'pointer', hover:'#E19938' }}>Send Link</button>
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

export default ForgetPassword;
