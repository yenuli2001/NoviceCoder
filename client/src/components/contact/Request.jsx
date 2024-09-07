import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './contact.css';
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/contact';
import toast from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage from '../../assets/images/img1.jpeg'; // Adjust path if necessary
import backgroundImage1 from '../../assets/images/img2.jpeg';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const dispatch = useDispatch();
  const { error, message } = useSelector(state => state.contact);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
    setName('');
    setEmail('');
    setCourse('');
    toast.error('Please login to your account');
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
        <div className="flex flex-col items-center justify-center min-h-screen p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl transition-shadow duration-300" >
          <h1 className="mb-8 text-3xl font-bold text-black">
            Request for Courses
          </h1>

          <form
            className="w-full max-w-lg p-8 bg-indigo-200 rounded-lg shadow-lg"
            action="POST"
            onSubmit={submitHandler}

          >
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Explain the Course..."
                value={course}
                onChange={e => setCourse(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white transition duration-300 bg-yellow-500 rounded-lg hover:bg-yellow-600">
              Send Mail
            </button>
            <div className="mt-4 text-center text-gray-600" >
              See all courses{' '}
              <Link to="/courses" className="text-blue-500 hover:underline" >
                Click here
              </Link>
            </div>
          </form>
          <h1 style={{ margin: '40px', paddingTop: '10px' }} className="mb-8 text-xl font-bold text-black">Recommended</h1>
          <div className="flex justify-center mt-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src={backgroundImage} alt="Description of image 1" className="w-full h-48 object-cover" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg font-bold">C#</h3>
                  <p className="mt-2 text-gray-600">Description for image 1. Provide more details about the image here.</p>
                </div>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src={backgroundImage} alt="Description of image 2" className="w-full h-48 object-cover" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg font-bold">React Native</h3>
                  <p className="mt-2 text-gray-600">Description for image 2. Provide more details about the image here.</p>
                </div>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col">
                <img src={backgroundImage} alt="Description of image 3" className="w-full h-48 object-cover" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg font-bold">Python</h3>
                  <p className="mt-2 text-gray-600">Description for image 3. Provide more details about the image here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Request;
