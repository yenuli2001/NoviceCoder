import { useEffect, useState } from 'react';
import './profile.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { removeFromPlaylist } from '../../redux/actions/course';
import Footer from '../layout/Footer';
import backgroundImage3 from '../../assets/images/img5.jpeg';

const Profile = ({ user }) => {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [progressValues, setProgressValues] = useState({});

  const dispatch = useDispatch();
  const { message: profileMessage, error: profileError } = useSelector(
    state => state.profile
  );
  const { message: courseMessage, error: courseError } = useSelector(
    state => state.course
  );

  useEffect(() => {
    if (profileError) {
      toast.error(profileError);
      dispatch({ type: 'clearProfileError' });
    }
    if (profileMessage) {
      toast.success(profileMessage);
      dispatch({ type: 'clearProfileMessage' });
    }

    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearCourseError' });
    }
    if (courseMessage) {
      toast.success(courseMessage);
      dispatch({ type: 'clearCourseMessage' });
    }

    // Set initial progress values for the playlist items
    if (user.playlist.length > 0) {
      const initialProgress = {};
      user.playlist.forEach(item => {
        initialProgress[item.course] = 'Progress'; // Default value for progress dropdown
      });
      setProgressValues(initialProgress);
    }
  }, [dispatch, profileError, profileMessage, courseError, courseMessage, user.playlist]);

  const removeFromPlaylistHandler = id => {
    dispatch(removeFromPlaylist(id));
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAvatar = e => {
    e.preventDefault();
    if (avatar && avatarPreview !== user.avatar.url) {
      const myForm = new FormData();
      myForm.append('file', avatar);
      dispatch(updateProfilePicture(myForm));
    }
  };

  // Handle the progress change from the dropdown
  const handleProgressChange = (e, courseId) => {
    const newProgress = e.target.value;
    setProgressValues(prev => ({ ...prev, [courseId]: newProgress }));

    // Trigger the toast if 'Completed' or 'In Progress' is selected
    if (newProgress === 'Completed') {
      toast.success('Wowza you have completed the course!!');
    } else if (newProgress === 'In Progress') {
      toast('Keep going, you got this!', {
        icon: '💪',
      });
    }

    // Here you can dispatch an action to update the course progress in the backend
    // For example: dispatch(updateCourseProgress(courseId, newProgress));
  };

  return (
    <>
      <div style={{ backgroundColor: '#845695', minHeight: '100vh', paddingBottom: '40px' }}>
        <div className="relative">
          <img
            src={backgroundImage3}
            alt="Profile Background"
            className="w-full h-64 object-cover"
            style={{ filter: 'brightness(80%)' }}
          />
        </div>

        <div className="flex justify-between items-center" style={{ marginTop: 30, paddingLeft: 20, paddingRight: 20 }}>
          <h1 className="text-5xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', color: 'black' }}>
            Welcome, {user.name}!
          </h1>

          <div className="flex space-x-4">
            <Link to="/request">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300">
                Request a Course
              </button>
            </Link>
            <Link to="/courses">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300">
                All Courses
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-screen-xl mx-auto mt-20 p-8 rounded-xl bg-orange-100">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-gray-800 p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Profile</h2>
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : user.avatar.url ? (
                    <img
                      src={user.avatar.url}
                      alt="Avatar"
                      className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <FaRegUserCircle size={144} className="text-gray-300" />
                  )}
                </div>

                <form onSubmit={updateAvatar} className="text-center">
                  <input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor="avatar-input"
                    className="text-indigo-600 cursor-pointer hover:underline mb-6 block"
                  >
                    Change Profile Picture
                  </label>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
                  >
                    Save Changes
                  </button>
                </form>
              </div>

              <div className="mt-8 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-600">Name</h3>
                    <p className="text-gray-900">{user.name}</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-600">Email</h3>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div className="sm:col-span-2 flex justify-center">
                    <div className="bg-gray-100 p-4 rounded-lg w-full sm:w-1/2">
                      <h3 className="text-lg font-semibold text-gray-600 text-center">Joined On</h3>
                      <p className="text-gray-900 text-center">{user.createdAt.split('T')[0]}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <Link to="/updateprofile">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
                      Update Profile
                    </button>
                  </Link>
                  <Link to="/changepassword">
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
                      Change Password
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Playlist Section */}
            <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Playlist</h2>
              {user.playlist.length > 0 ? (
                <div className="space-y-6">
                  {user.playlist.map(item => (
                    <div key={item.course} className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src={item.poster}
                          alt="Playlist Image"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 ml-4">
                          <h3 className="text-md font-bold text-gray-700">{item.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link to={`/course/${item.course}`}>
                            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300">
                              Watch Now
                            </button>
                          </Link>
                          <button
                            onClick={() => removeFromPlaylistHandler(item.course)}
                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                          >
                            <RiDeleteBin7Fill className="mr-2" /> Delete
                          </button>
                        </div>
                      </div>

                      {/* Dropdown to select progress */}
                      <div className="w-full mt-4">
                        <label htmlFor={`progress-${item.course}`} className="block text-sm text-gray-600 mb-1">
                          Update Progress:
                        </label>
                        <select
                          id={`progress-${item.course}`}
                          value={progressValues[item.course]}
                          onChange={(e) => handleProgressChange(e, item.course)}
                          className="w-full bg-indigo-300 rounded-md p-2"
                        >
                          <option value="Progress">Progress</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Current progress: {progressValues[item.course]}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">Your playlist is empty. Start adding some courses!</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
