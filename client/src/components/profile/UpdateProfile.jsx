import { useState } from 'react';
import './profile.css';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';
import backgroundImage from '../../assets/images/img5.jpeg';
import { Link } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
    navigate('/profile');
  };

  return (
    <>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#845695' }}>
        {/* Left Side: Image */}
        <div style={{ flex: 1 }}>
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
          
            <form onSubmit={submitHandler} className="bg-gray-800 text-center border border-gray-400 shadow-lg p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Update Profile</h1>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 mb-4 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  style={{ color: '#000', backgroundColor: '#fff', borderRadius: 5, borderWidth: '2px' }}
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  style={{ color: '#000', backgroundColor: '#fff', borderRadius: 5, borderWidth: '2px' }}
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-600 transform hover:scale-105"
                style={{ borderRadius: 5 }}
              >
                Update Profile
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

export default UpdateProfile;
