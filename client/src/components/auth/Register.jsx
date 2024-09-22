import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { registerForm } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import './login.css';
import backgroundImage1 from '../../assets/images/img5.jpeg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const formHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', avatar);

    dispatch(registerForm(myForm));
    toast.error('Sorry this is a demo site');
  };

  return (
    <>
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', display: 'flex' }}>
        {/* Left Side: Image */}
        <div className="left-side-image" style={{ flex: '1', position: 'relative' }}>
          <img
            src={backgroundImage1}
            alt="Description of image 2"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(80%)', height: '100vh' }} // Adjust height to fit the full viewport
          />
        </div>

        {/* Right Side: Form */}
        <div className="right-side-form" style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '80%' }} className="max-w-md p-8 bg-orange-100 border border-gray-300 shadow-md rounded-xl"> {/* Increased mt for more spacing */}
          <div style={{ width: '99%' }} className="max-w-md p-8 bg-gray-800 border border-gray-300 shadow-md rounded-xl">
            <h1 className="text-4xl font-bold text-center mb-10 text-white">Register</h1>

            <form onSubmit={formHandler} className="space-y-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="preAvator" style={{ textAlign: 'center', marginBottom: '20px' }}>
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%' }}
                  />
                ) : (
                  <FaRegUserCircle size={100} />
                )}
              </div>

              <input
                type="text"
                placeholder="Enter Your Name..."
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <input
                type="email"
                placeholder="Email Address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <input
                type="password"
                placeholder="Password..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              />

              {/* Avatar input */}
              <div className="avatar" style={{ marginBottom: '20px' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ color: 'lightblue' }} // Light blue text color for "No file chosen"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white transition duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-600 transform hover:scale-105">
                Register
              </button>
              <div className="loginLinks" style={{ marginTop: '10px', textAlign: 'center' }}>
                <Link to="/login" style={{ color: 'lightblue', textDecoration: 'underline' }}> {/* Set the "Already have an account?" text to light blue */}
                  Already have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
