import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import introVideo from '../../assets/videos/intro.mp4';
import axios from 'axios';
import { server } from '../../redux/store';

const CoursePage = () => {
  const { courseId } = useParams(); // Extract the courseId from the URL
  const [lectureNumber, setLectureNumber] = useState(0);
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch lectures when courseId changes
  useEffect(() => {
    console.log('Fetching lectures for courseId:', courseId);
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
    <div className="container">
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
                <h2 className="lecture-title">{`#${lectureNumber + 1}: ${
                  lectures[lectureNumber]?.title
                }`}</h2>
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
                className={`lecture-button ${
                  index === lectureNumber ? 'active' : ''
                }`}
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
        }
        .buttonContainer {
          display: flex;
          justify-content: space-between;
        }
        .course-content {
          background: linear-gradient(to right, #3498db, #8e44ad);
          border-radius: 8px;
          padding: 20px;
          color: white;
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
          color: #f0f0f0;
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
          background-color: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          color: white;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .lecture-button:hover,
        .lecture-button.active {
          background-color: rgba(255, 255, 255, 0.2);
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
  );
};

export default CoursePage;
