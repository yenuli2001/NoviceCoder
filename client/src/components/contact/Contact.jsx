import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './contact.css';
import { contactUs } from '../../redux/actions/contact';
import { toast } from 'react-hot-toast';
import Footer from '../layout/Footer';
import backgroundImage from '../../assets/images/img2.jpeg';


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
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 items-center">
          <img src={backgroundImage} alt="Description of image 2" className="w-full h-48 object-cover"style={{ marginTop: '5px', marginBottom:'20px', paddingLeft:'10px', paddingRight:'10px',height:'300px'}}/>
            <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
      <div className="h-screen pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 max-w-7xl mx-auto px-4">
          <div className="flex-1 max-w-md p-6 bg-indigo-200 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="mb-6 text-2xl font-bold text-center">Contact Us</h1>

            <form
              action="POST"
              onSubmit={submitHandler}
              className="flex flex-col"
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="p-3 mb-4 text-lg border border-gray-300 rounded-lg"
              />

              <input
                type="email"
                placeholder="Email Address"
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
                className="p-3 text-lg text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
              >
                Send Mail
              </button>

              <div className="mt-6 text-center">
                Request for a course{' '}
                <Link to="/request" className="text-blue-500 hover:underline">
                  Click here
                </Link>
              </div>
            </form>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full">
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
                  <p className="mt-2 text-gray-600">we will solve your coding issues</p>
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

      </div>
     </div>
      <Footer />
    </>
  );
};

export default Contact;
