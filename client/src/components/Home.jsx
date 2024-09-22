import { Link } from 'react-router-dom';
import bg from '../assets/images/un.png.svg';
import introVideo from '../assets/videos/intro.mp4';
import './home.css';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import Footer from './layout/Footer';

const Home = () => {
  return (
    <>
      <div className="relative flex items-center content-center justify-center h-screen pt-16 pb-32 bg-gradient-to-r from-blue-500 to-purple-600">
        <div></div>
        <div className="text-center text-white">
          <h1 className="mb-4 text-5xl font-extrabold">
            NoviceCoder <br /> Programming Assisting System
          </h1>
          <p className="mb-8 text-lg">
            Find Valuable Content At Reasonable Prices. A platform for college
            students <br /> to learn some skills and prepare for the future.
          </p>
          <button className="relative inline-block px-6 py-3 font-bold text-white transition duration-300 bg-yellow-500 rounded-full hover:bg-yellow-600">
            <Link to="/courses">
              <span className="absolute inset-0 w-full h-full transition duration-300 bg-yellow-600 rounded-full opacity-0 hover:opacity-100"></span>
              <span className="relative">Explore Now</span>
            </Link>
          </button>
        </div>
        <div className="px-6 img">
          <img src={bg} alt="Img" className="rounded-lg shadow-lg" />
        </div>
      </div>

      <div className="my-16 text-center">
        <h1 className="mb-8 text-3xl font-bold">Our Brands</h1>
        <div className="flex justify-center space-x-8 text-4xl">
          <CgGoogle />
          <CgYoutube />
          <DiAws />
          <SiCoursera />
          <SiUdemy />
        </div>
      </div>

      <div className="py-8 overflow-x-auto">
        <div className="flex px-8 space-x-8">
          <div className="p-6 m-4 transition duration-500 transform bg-white rounded-lg shadow-lg card hover:scale-105">
            <CgGoogle className="mb-4 text-blue-500" />
            <h2 className="mb-2 text-xl font-bold">Google</h2>
            <p className="text-gray-700">
              Leading search engine and tech giant.
            </p>
          </div>
          <div className="p-6 m-4 transition duration-500 transform bg-white rounded-lg shadow-lg card hover:scale-105">
            <CgYoutube className="mb-4 text-red-500" />
            <h2 className="mb-2 text-xl font-bold">YouTube</h2>
            <p className="text-gray-700">Popular video-sharing platform.</p>
          </div>
          <div className="p-6 m-4 transition duration-500 transform bg-white rounded-lg shadow-lg card hover:scale-105">
            <DiAws className="mb-4 text-yellow-500" />
            <h2 className="mb-2 text-xl font-bold">AWS</h2>
            <p className="text-gray-700">Cloud computing services by Amazon.</p>
          </div>
          <div className="p-6 m-4 transition duration-500 transform bg-white rounded-lg shadow-lg card hover:scale-105">
            <SiCoursera className="mb-4 text-blue-600" />
            <h2 className="mb-2 text-xl font-bold">Coursera</h2>
            <p className="text-gray-700">
              Online courses from top universities.
            </p>
          </div>
          <div className="p-6 m-4 transition duration-500 transform bg-white rounded-lg shadow-lg card hover:scale-105">
            <SiUdemy className="mb-4 text-orange-500" />
            <h2 className="mb-2 text-xl font-bold">Udemy</h2>
            <p className="text-gray-700">
              Online learning and teaching marketplace.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center my-16">
        <video
          className="rounded-lg shadow-lg"
          autoPlay
          controls
          muted
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>
      </div> */}
      <Footer />
    </>
  );
};

export default Home;
