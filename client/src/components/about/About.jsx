import './about.css';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Slider from 'react-slick';
import backgroundImage1 from '../../assets/images/C1.jpeg';
import backgroundImage3 from '../../assets/images/img5.jpeg'; 
import backgroundImage4 from '../../assets/images/S1.jpeg'; 
import backgroundImage5 from '../../assets/images/S2.jpeg'; 
import backgroundImage6 from '../../assets/images/S4.jpeg'; 
import backgroundImage7 from '../../assets/images/C2.jpeg';
import backgroundImage8 from '../../assets/images/C3.jpeg';

const About = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
        
        {/* Image Slider */}
        <div style={{ marginTop: 20 }} className="max-w-screen-xl mx-auto mb-6">
          <Slider {...settings}>
            <div>
              <img src={backgroundImage4} alt="Slide 1" className="w-full h-80 object-cover rounded-lg" /> {/* Adjust height as needed */}
            </div>
            <div>
              <img src={backgroundImage5} alt="Slide 2" className="w-full h-80 object-cover rounded-lg" /> {/* Adjust height as needed */}
            </div>
            <div>
              <img src={backgroundImage6} alt="Slide 3" className="w-full h-80 object-cover rounded-lg" /> {/* Adjust height as needed */}
            </div>
          </Slider>
        </div>

        <div className="flex justify-center mt-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
            {/* Compiler Card */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <img src={backgroundImage1} alt="Compiler" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Compiler</h3>
                <p className="mt-2 text-gray-600">
                  Our compiler offers real-time code execution for various languages, ensuring you can test and run your programs efficiently. 
                  Whether you're learning to code or working on a project, our tool will speed up your development.
                </p>
              </div>
            </div>

            {/* Live Streaming Card */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <img src={backgroundImage7} alt="Live Streaming" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">Live Streaming</h3>
                <p className="mt-2 text-gray-600">
                  With our live streaming feature, you can broadcast your coding sessions, tutorials, or events to a global audience in real-time. 
                  Perfect for educators, content creators, and learners alike to connect and share knowledge.
                </p>
              </div>
            </div>

            {/* NoviceCoder Card */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <img src={backgroundImage8} alt="NoviceCoder" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">NoviceCoder</h3>
                <p className="mt-2 text-gray-600">
                  NoviceCoder is an interactive platform designed for beginners to learn coding. It provides step-by-step lessons, coding challenges, and 
                  community support to guide you through your coding journey.
                </p>
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
