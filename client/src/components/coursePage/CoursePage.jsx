import './coursePage.css';
import introVideo from '../../assets/videos/intro.mp4';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CoursePage = () => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const navigate = useNavigate();
  const lectures = [
    {
      _id: '1',
      title: 'Introduction to the Course',
      description: 'This is the introductory lecture for the course.',
    },
    {
      _id: '2',
      title: 'Lecture 2: Advanced Topics',
      description: 'This lecture covers advanced topics in the course.',
    },
    {
      _id: '3',
      title: 'Lecture 3: Practical Applications',
      description:
        'This lecture discusses practical applications of the course material.',
    },
  ];

  return (
    <>
      <div className="p-20 transition-shadow duration-300 border rounded-lg shadow-lg coursePageContainer bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl">
        <div className="leftSideContainer">
          <video
            autoPlay
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
          ></video>
          <div className="videoIntroDetails">
            <h1>{`#${lectureNumber + 1}: ${lectures[lectureNumber].title}`}</h1>
            <div className="videoDescription">
              <h1>Description</h1>
              <p>{lectures[lectureNumber].description}</p>
            </div>
          </div>
        </div>
        <div className="rightSideContainer">
          {lectures.map((item, index) => (
            <button
              key={item._id}
              onClick={() => {
                setLectureNumber(index);
              }}
            >
              #{index + 1} {item.title}
            </button>
          ))}
        </div>
        <div className="buttonContainer">
          <Link to="/code-editor">
            <button className="compilerButton">Compiler</button>
          </Link>

          <button className="streamButton" onClick={() => navigate('/lobby')}>
            Stream
          </button>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
