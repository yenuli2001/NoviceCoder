import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="footer bg-gray-800 text-white py-8">
        <h1 className="text-center text-2xl font-bold mb-4">
          Connect with us through social media
        </h1>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            <FaLinkedinIn size={30} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            <FaGithub size={30} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
