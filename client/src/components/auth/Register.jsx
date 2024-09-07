import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { registerForm } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import './login.css';
import backgroundImage from '../../assets/images/img2.jpeg';

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
      <div>
          <img src={backgroundImage} alt="Description of image 2" className="w-full h-48 object-cover"style={{ marginTop: '5px', marginBottom:'20px', paddingLeft:'10px', paddingRight:'10px',height:'300px'}}/>
            <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
        </div>
      <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="flex items-center justify-center h-full">
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
              <h1 className="mb-6 text-3xl font-bold text-center">Register</h1>

              <form action="POST" onSubmit={formHandler}>
                {/* Add avatar preview here */}
                <div className="preAvator">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  ) : (
                    <FaRegUserCircle size={100} />
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />

                {/* for Avatar */}
                <div className="avator" style={{ marginBottom: '10px' }}>
                  <input type="file" accept="image/*" onChange={handleAvatarChange} />
                </div>

                <button
                  type="submit"
                  style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#E19937', color: 'white', border: 'none', cursor: 'pointer', hover:'#E19938' }}>
                  Register
                </button>
                <div className="loginLinks hover:underline" style={{ marginTop: '10px' }}>
                  <Link to="/login">Already have an account?</Link>
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
