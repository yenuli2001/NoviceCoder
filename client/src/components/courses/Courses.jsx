import { useEffect, useState } from 'react';
import './courses.css';
import Course from './Course';
import { useDispatch, useSelector } from 'react-redux';
import { allCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import backgroundImage1 from '../../assets/images/img5.jpeg';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';

const Courses = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [category, setcategory] = useState('');

  const categories = ['Web Development', 'Machine Learning', 'Mobile App Dev'];

  const { courses, error } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(allCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [category, keyword, dispatch, error]);

  const initialCourses = [
    {
      _id: 'edjdjewnfwe312',
      title: 'Machine Learning',
      description: 'Learn Machine learning in this course',
      poster: {
        url: 'https://res.cloudinary.com/dk4xv6wps/image/upload/v1699544564/msdyraedssal8kwn9t52.jpg',
      },
      views: 1,
      numOfVideos: 0,
      category: 'Machine Learning',
      createdBy: 'waleed',
      lectures: [
        {
          _id: '1',
          title: 'Introduction to Machine Learning',
          description: 'This is the introductory lecture for Machine Learning.',
        },
        {
          _id: '2',
          title: 'Supervised Learning',
          description:
            'This lecture covers supervised learning in Machine Learning.',
        },
      ],
    },
    {
      _id: 'edjdjiuas3nfwe312',
      title: 'Full Stack',
      description:
        'Complete full stack mobile application course for beginners',
      poster: {
        url: 'https://res.cloudinary.com/dk4xv6wps/image/upload/v1699544412/kwcqsok1nermqdwvmmsm.jpg',
      },
      views: 1,
      numOfVideos: 0,
      category: 'Machine Learning',
      createdBy: 'waleed',
      lectures: [
        {
          _id: '1',
          title: 'Introduction to Full Stack Development',
          description:
            'This is the introductory lecture for Full Stack Development.',
        },
        {
          _id: '2',
          title: 'Frontend Development',
          description:
            'This lecture covers frontend development in Full Stack Development.',
        },
      ],
    },
  ];

  const allDisplayedCourses = [...initialCourses, ...courses];

  return (
    <>
      <div
        style={{
          backgroundColor: '#845695',
          minHeight: '100vh',
          paddingBottom: '40px',
        }}
      >
        <img
          src={backgroundImage1}
          alt="Description of image 2"
          className="object-cover w-full h-64"
          style={{ marginBottom: '20px' }}
        />
        <div className="flex items-center justify-between px-8 mb-6 text-black">
          <h1
            className="text-5xl font-bold text-white"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
              color: 'black',
            }}
          >
            Welcome to NoviceCoder!
          </h1>
          <div className="space-x-4">
            <Link to="/profile">
              <button className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                Profile
              </button>
            </Link>
            <Link to="/request">
              <button className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
                Request a course
              </button>
            </Link>
          </div>
        </div>
        <div className="p-20 transition-shadow duration-300 shadow-lg hover:shadow-xl">
          <h1 className="mb-6 text-3xl font-bold">All Courses</h1>

          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search a course..."
            className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex flex-wrap gap-4 mb-6">
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={() => setcategory(item)}
                className="px-4 py-2 text-white transition duration-300 transform bg-indigo-500 rounded-lg hover:bg-indigo-600 hover:scale-105"
              >
                <p>{item}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allDisplayedCourses.length > 0 ? (
              allDisplayedCourses.map(item => (
                <Course
                  key={item._id}
                  id={item._id}
                  courseId={item._id}
                  img={item.poster.url}
                  title={item.title}
                  content={item.description}
                  creator={item.createdBy}
                  leacture={item.numOfVideos}
                  views={item.views}
                  lectures={item.lectures}
                />
              ))
            ) : (
              <h1 className="text-xl font-semibold text-center col-span-full">
                Courses Not Found
              </h1>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
