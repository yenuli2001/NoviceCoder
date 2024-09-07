import './about.css';
import founder from '../../assets/images/founder.jpg';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import backgroundImage from '../../assets/images/img1.jpeg';
import backgroundImage1 from '../../assets/images/img2.jpeg';

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 items-center">
        <img src={backgroundImage1} alt="Description of image 2" className="w-full h-48 object-cover" style={{ marginTop: '5px', marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px', height: '300px' }} />
        <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
        <div className="h-screen pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600 items-center">
          <div className="space-y-4 bg-indigo-200 text-center border border-gray rounded-lg shadow-lg" style={{ paddingTop: '50px', paddingBottom: '50px', margin: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
            <div className='flex justify-center'>
              <div className="p-8 py-4 text-center rounded-lg shadow-lg bg-white">
                <h1 className="mb-4 text-4xl font-bold text-gray-800">
                  NoviceCoder pvt ltd
                </h1>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  NoviceCoder for beginner programmers
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  NoviceCoder for tutors
                </p>
                <div className="flex justify-center">
                  <div className="w-32 px-4 py-2 text-white transition duration-300 bg-yellow-500 rounded-lg hover:bg-yellow-600">
                    <Link to="/subscribe">
                      <button>Premium plan</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <img src={backgroundImage} alt="Description of image 1" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Standard</h3>
                  <p className="mt-2 text-gray-600">Description for image 1. Provide more details about the image here.</p>
                </div>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <img src={backgroundImage} alt="Description of image 2" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Basic</h3>
                  <p className="mt-2 text-gray-600">Description for image 2. Provide more details about the image here.</p>
                </div>
              </div>
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <img src={backgroundImage} alt="Description of image 3" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Premium</h3>
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

export default About;
