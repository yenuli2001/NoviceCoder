import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/course';
import './course.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Course = props => {
  const dispatch = useDispatch();

  const addToPlayList = courseId => {
    dispatch(addToPlaylist(courseId));
    toast.error('Please login to your account');
  };

  const { message, error } = useSelector(state => state.course);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [message, dispatch, error]);

  return (
    <div className="p-6 transition-shadow duration-300 bg-orange-100 border rounded-lg shadow-lg hover:shadow-xl">
      <img
        src={props.img}
        alt="course-img"
        className="object-cover w-full rounded-t-lg h-60"
      />
      <div className="p-4">
        <h4 className="mt-4 text-2xl font-bold text-gray-800">{props.title}</h4>
        <div className="section">
          <p className="mt-2 text-gray-700 contain-content">{props.content}</p>
        </div>
        <h5 className="mt-2 text-gray-600">{`Creator: ${props.creator}`}</h5>
        <h5 className="text-gray-600">{`Lectures: ${props.leacture}`}</h5>
        <h5 className="text-gray-600">{`Views: ${props.views}`}</h5>
        <div className="flex mt-4 space-x-4">
          <Link to={`/course/${props.id}`}>
            <button className="px-6 py-2 text-white transition duration-300 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800">
              Watch Now
            </button>
          </Link>

          <button
            onClick={() => addToPlayList(props.courseId)}
            className="px-6 py-2 text-white transition duration-300 rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
          >
            Add to Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
