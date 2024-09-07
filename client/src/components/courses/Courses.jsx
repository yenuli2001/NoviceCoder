import { useEffect, useState } from 'react';
import './courses.css';
import Course from './Course';
import { useDispatch, useSelector } from 'react-redux';
import { allCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import backgroundImage1 from '../../assets/images/img2.jpeg';
import Footer from '../layout/Footer';

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
      lectures: [],
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
      lectures: [],
    },
  ];

  const allDisplayedCourses = [...initialCourses, ...courses];

  return (

    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 items-center">
        <img src={backgroundImage1} alt="Description of image 2" className="w-full h-48 object-cover" style={{ marginTop: '5px', marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px', height: '300px' }} />
        <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
        <div className="p-20 border rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl transition-shadow duration-300">
          <h1 className="mb-6 text-3xl font-bold">All Courses</h1>

          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Search a course"
            className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-4 mb-6">
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={() => setcategory(item)}
                className="px-4 py-2 text-white transition duration-300 bg-yellow-500 rounded-lg hover:bg-blue-600"
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
