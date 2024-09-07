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
    <div className="p-6 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img
        src={props.img}
        alt="course-img"
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h4 className="text-2xl font-bold mt-4 text-gray-800">{props.title}</h4>
        <div className="section">
          <p className="text-gray-700 mt-2 contain-content">{props.content}</p>
        </div>
        <h5 className="text-gray-600 mt-2">{`Creator: ${props.creator}`}</h5>
        <h5 className="text-gray-600">{`Lectures: ${props.leacture}`}</h5>
        <h5 className="text-gray-600">{`Views: ${props.views}`}</h5>
        <div className="mt-4 flex space-x-4">
          <Link to={`/course/${props.id}`}>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition duration-300">
              Watch Now
            </button>
          </Link>
          <button
            onClick={() => addToPlayList(props.courseId)}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg hover:from-green-600 hover:to-green-800 transition duration-300"
          >
            Add to Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Course;
