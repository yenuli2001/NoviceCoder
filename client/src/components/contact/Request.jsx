import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './contact.css';
import { useDispatch, useSelector } from 'react-redux';
import { courseRequest } from '../../redux/actions/contact';
import toast from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage from '../../assets/images/img1.jpeg'; // Adjust path if necessary
import backgroundImage1 from '../../assets/images/img5.jpeg';
import image4 from '../../assets/images/img4.jpeg'
import image2 from '../../assets/images/img2.jpeg'
import image6 from '../../assets/images/img6.jpeg'

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
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', paddingBottom: '40px' }}>
        <img
          src={backgroundImage1}
          alt="Description of image 2"
          className="w-full h-64 object-cover"
          style={{ marginBottom: '20px' }}
        />
        <div className="flex justify-between items-center mb-6 text-black px-8">
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
          </div>
        </div>
  
        <div className="flex flex-col items-center justify-center min-h-screen mt-8"> {/* Reduced mt-16 to mt-8 */}
          <h1 className="mb-4 text-3xl font-bold text-black">Request for Courses</h1> {/* Reduced mb-8 to mb-4 */}
  
          <div style={{ width: '30%' }} className="h-full max-w-screen-xl mx-auto mt-4 p-8 rounded-xl bg-orange-100 shadow-lg"> {/* Reduced mt-20 to mt-4 */}
            <form
              className="flex-1 bg-gray-800 p-6 rounded-xl shadow-lg"
              action="POST"
              onSubmit={submitHandler}
            >
              <div className="mb-4">
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                  placeholder="Name..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="email"
                  placeholder="Email Address..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Explain the Course..."
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white transition duration-300 bg-indigo-500 rounded-lg hover:bg-indigo-600 transform hover:scale-105"
              >
                Send Mail
              </button>
              <div className="mt-4 text-center text-white">
                See all courses{' '}
                <Link to="/courses" className="text-blue-300 hover:underline">
                  Click here
                </Link>
              </div>
            </form>
          </div>
  
          <h2 className="mt-8 mb-4 text-2xl font-bold text-black">Introduction to Languages</h2> {/* Adjusted margins */}
  
          <div className="flex justify-center mt-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
              {/* Card 1 */}
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image4}
                  alt="C#"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">C#</h3>
                  <p className="mt-2 text-gray-600">
                    Learn the fundamentals of C# and start building powerful applications.
                  </p>
                  <a
                    href="https://learn.microsoft.com/en-us/dotnet/csharp/"
                    className="mt-4 inline-block text-indigo-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
  
              {/* Card 2 */}
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image6}
                  alt="React Native"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Java</h3>
                  <p className="mt-2 text-gray-600">
                  Start your Java journey with this comprehensive course.
                  </p>
                  <a
                    href="https://www.w3schools.com/java/java_intro.asp"
                    className="mt-4 inline-block text-indigo-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
  
              {/* Card 3 */}
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image2}
                  alt="Python"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Python</h3>
                  <p className="mt-2 text-gray-600">
                    Start your Python journey with this comprehensive course.
                  </p>
                  <a
                    href="https://www.python.org/"
                    className="mt-4 inline-block text-indigo-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
               {/* Card 4 */}
               <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image4}
                  alt="Python"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">TypeScript</h3>
                  <p className="mt-2 text-gray-600">
                    Start your TypeScript journey with this comprehensive course.
                  </p>
                  <a
                    href="https://www.typescriptlang.org/"
                    className="mt-4 inline-block text-indigo-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              {/* Card 5 */}
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image6}
                  alt="Python"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">JavaScript</h3>
                  <p className="mt-2 text-gray-600">
                    Start your JavaScript journey with this comprehensive course.
                  </p>
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics"
                    className="mt-4 inline-block text-indigo-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              {/* Card 6 */}
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image2}
                  alt="Python"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">PHP</h3>
                  <p className="mt-2 text-gray-600">
                    Start your PHP journey with this comprehensive course.
                  </p>
                  <a
                    href="https://www.w3schools.com/php/php_intro.asp"
                    className="mt-4 inline-block text-indigo-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
  
}  

export default Request;
