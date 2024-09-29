import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage3 from '../../assets/images/img5.jpeg'; // Adjust the path as necessary
import Footer from '../layout/Footer';

const CoursePage = () => {
  const { courseId } = useParams(); // Extract the courseId from the URL
  const [lectureNumber, setLectureNumber] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch lectures when courseId changes
  useEffect(() => {
    const fetchLectures = async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        const { data } = await axios.get(
          'http://localhost:5000/api/v1/course/' + courseId
        );
        setLectures(data.lectures);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching lectures');
        setLoading(false);
      }
    };

    fetchLectures();
  }, [courseId]);

  const handleLectureChange = index => {
    setLectureNumber(index);
  };

  return (
    <div style={{ backgroundColor: '#845695', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="relative">
        <img
          src={backgroundImage3}
          alt="Profile Background"
          className="w-full h-64 object-cover"
          style={{ filter: 'brightness(80%)', marginBottom: 20 }}
        />
      </div>

      <div className="container" style={{ flex: 1 }}>
        <div className="course-content">
          <h1 className="title">Premium Course Content</h1>
          <div className="content-wrapper">
            <div className="video-container">
              {loading ? (
                <div className="loading">Loading...</div>
              ) : error ? (
                <p className="error">{error}</p>
              ) : lectures.length > 0 ? (
                <div className="lecture-content">
                  <video
                    key={lectures[lectureNumber]?.id}
                    controls
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    src={lectures[lectureNumber]?.video.url}
                    className="video-player"
                  />
                  <h2 className="lecture-title">{`#${lectureNumber + 1}: ${lectures[lectureNumber]?.title}`}</h2>
                  <p className="lecture-description">
                    {lectures[lectureNumber]?.description}
                  </p>
                </div>
              ) : (
                <p className="no-lectures">No lectures available.</p>
              )}
            </div>
            <div className="lecture-list">
              <h3 className="list-title">Course Content</h3>
              {lectures.map((lecture, index) => (
                <button
                  key={lecture.id}
                  className={`lecture-button ${index === lectureNumber ? 'active' : ''}`}
                  onClick={() => handleLectureChange(index)}
                >
                  {index <= lectureNumber ? '▶' : '🔒'}{' '}
                  {`#${index + 1} ${lecture.title}`}
                </button>
              ))}
              <div className="buttonContainer">
                <Link to="/code-editor">
                  <button className="compilerButton">Compiler</button>
                </Link>

                <button
                  className="streamButton"
                  onClick={() => navigate('/lobby')}
                >
                  Stream
                </button>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            color: black; /* Ensure text is readable */
          }
          .buttonContainer {
            display: flex;
            justify-content: space-between;
          }
          .course-content {
            background-color: #d3d3d3; /* Light gray background color */
            border-radius: 8px;
            padding: 20px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .content-wrapper {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .video-container {
            flex: 2;
          }
          .video-player {
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            border-radius: 8px;
          }
          .lecture-title {
            font-size: 20px;
            margin-top: 10px;
          }
          .lecture-description {
            margin-top: 10px;
            color: #333; /* Darker text for contrast */
          }
          .lecture-list {
            flex: 1;
          }
          .list-title {
            font-size: 18px;
            margin-bottom: 10px;
          }
          .lecture-button {
            display: block;
            width: 100%;
            padding: 10px;
            margin-bottom: 5px;
            background-color: rgba(200, 150, 250, 0.7); /* Darker shade for buttons */
            border: none;
            border-radius: 4px;
            color: black; /* Change text color for better readability */
            text-align: left;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          .lecture-button:hover,
          .lecture-button.active {
            background-color: rgba(250, 250, 250, 1); /* Darker on hover */
          }
          .compilerButton,
          .streamButton {
            padding: 12px 20px; /* Increase padding for visibility */
            background-color: #7B68EE; /* Darker purple background */
            color: white; /* White text for contrast */
            border: none;
            border-radius: 5px; /* Rounded corners */
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 16px; /* Increase font size */
            outline: none; /* Remove default outline */
            -webkit-appearance: none; /* Remove default styling in WebKit browsers */
          }
          .compilerButton:hover,
          .streamButton:hover {
            background-color: #6A5ACD; /* Darker shade of purple on hover */
          }
          .compilerButton:focus,
          .streamButton:focus {
            outline: none; /* Remove focus outline */
            background-color: #7B68EE; /* Maintain background color on focus */
          }
          .loading,
          .error,
          .no-lectures {
            padding: 20px;
            text-align: center;
          }
          .error {
            color: #ff6b6b;
          }
          @media (min-width: 768px) {
            .content-wrapper {
              flex-direction: row;
            }
          }
        `}</style>
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;
