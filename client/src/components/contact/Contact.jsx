import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './contact.css';
import { contactUs } from '../../redux/actions/contact';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage from '../../assets/images/img2.jpeg';
import backgroundImage3 from '../../assets/images/img5.jpeg';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const { error, message: stateMessage } = useSelector(state => state.contact);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
    setName('');
    setEmail('');
    setMessage('');
    toast.error('Please Login to user account');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (stateMessage) {
      toast.success(stateMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, stateMessage]);

  return (
    <>
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', paddingBottom: '40px' }}>
        {/* Header section with background image */}
        <div className="relative">
          <img
            src={backgroundImage3}
            alt="Profile Background"
            className="w-full h-64 object-cover"
            style={{ filter: 'brightness(80%)' }}
          />
        </div>
        <div className="flex justify-between items-center mb-6 text-black px-8"  style={{ marginTop: 30, paddingLeft: 20, paddingRight: 20 }}>
        <h1 className="text-5xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', color: 'black' }}>
            Welcome to NoviceCoder!
          </h1>
          <div className="space-x-4">
            <Link to="/profile">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                Profile
              </button>
            </Link>
            <Link to="/courses">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                All Courses
              </button>
            </Link>
            <Link to="/request">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                Request a course
              </button>
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <h1 className="mb-4 text-3xl font-bold text-black text-center" style={{marginTop:40}}>Contact Us</h1>
        <div style={{ width: '30%' }} className="h-full max-w-screen-xl mx-auto mt-4 p-8 rounded-xl bg-orange-100 shadow-lg"> {/* Reduced mt-20 to mt-4 */}
        <div className="flex flex-col items-center">
          <div className="flex-1 max-w-md p-6 bg-gray-800 border border-gray-300 rounded-lg shadow-lg">
            

            <form action="POST" onSubmit={submitHandler} className="flex flex-col">
              <input
                type="text"
                placeholder="Name..."
                value={name}
                onChange={e => setName(e.target.value)}
                className="p-3 mb-4 text-lg border border-gray-300 rounded-lg"
              />

              <input
                type="email"
                placeholder="Email Address..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="p-3 mb-4 text-lg border border-gray-300 rounded-lg"
              />

              <textarea
                placeholder="Enter your Message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="p-3 mb-4 text-lg border border-gray-300 rounded-lg"
              />

              <button
                type="submit"
                className="w-full px-4 py-2 text-lg text-white transition duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-600 transform hover:scale-105"
              >
                Send Mail
              </button>

              <div className="mt-6 text-center text-white">
                Request for a course{' '}
                <Link to="/request" className="text-blue-500 hover:underline" style={{color: 'lightblue'}}>
                  Click here
                </Link>
              </div>
            </form>
          </div>
        </div>
        </div>

        {/* Cards Section - Moved below the form */}
        <div className="flex justify-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img src={backgroundImage} alt="Help" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold">Help</h3>
                <p className="mt-2 text-gray-600">Contact team through - help@gmail.com</p>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img src={backgroundImage} alt="Q&A" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold">Q&A</h3>
                <p className="mt-2 text-gray-600">We will solve your coding issues</p>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img src={backgroundImage} alt="Additional" className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold">Additional</h3>
                <p className="mt-2 text-gray-600">Description for Additional. Provide more details about the image here.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Contact;
