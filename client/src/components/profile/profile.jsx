import { useEffect, useState } from 'react';
import './profile.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { removeFromPlaylist } from '../../redux/actions/course';
import Footer from '../layout/Footer'
import backgroundImage1 from '../../assets/images/img2.jpeg';

const Profile = ({ user }) => {
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

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
  }, [dispatch, profileError, profileMessage, courseError, courseMessage]);

  const removeFromPlaylistHandler = id => {
    console.log(id);
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

  const updateAvator = e => {
    e.preventDefault();
    if (avatar && avatarPreview !== user.avatar.url) {
      const myForm = new FormData();
      myForm.append('file', avatar);
      dispatch(updateProfilePicture(myForm));
    }
  };

  return (

    <>
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 items-center">
        <img src={backgroundImage1} alt="Description of image 2" className="w-full h-48 object-cover" style={{ marginTop: '5px', marginBottom: '20px', paddingLeft: '10px', paddingRight: '10px', height: '300px' }} />
        <h1 className="mb-6 text-4xl font-bold text-center">Welcome to NoviceCoder!</h1>
      <div className="p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-3xl font-bold text-center mb-6 text-black-800">
          Profile
        </h1>
        <div className="flex flex-col items-center">
          {/* Add avatar preview here */}
          <div className="mb-4">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : user.avatar.url ? (
              <img
                src={user.avatar.url}
                alt="Avatar Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <FaRegUserCircle size={128} className="text-gray-400" />
            )}
          </div>

          <div className="mb-6">
            <form
              onSubmit={updateAvator}
              className="flex flex-col items-center"
            >
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
              <label
                htmlFor="avatar-input"
                className="cursor-pointer text-blue-800 hover:underline mb-2"
              >
                Change Photo
              </label>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
              >
                Submit Photo Changes
              </button>
            </form>
          </div>
        </div>
        <div className="space-y-4 bg-indigo-200 text-center border border-gray rounded-lg shadow-lg" style={{paddingTop: '20px'}}>
          <div className="space-y-4 bg-blue-200 text-center border border-gray rounded-lg shadow-lg" style={{margin:'9px'}}>
            <h3 className="text-lg font-semibold text-black-700">Name</h3>
            <p className="text-gray-900">{user.name}</p>
          </div>
          <div className="space-y-4 bg-blue-200 text-center border border-gray rounded-lg shadow-lg" style={{margin:'9px'}}>
            <h3 className="text-lg font-semibold text-black-700">Email</h3>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div className="space-y-4 bg-blue-200 text-center border border-gray rounded-lg shadow-lg" style={{margin:'9px'}}>
            <h3 className="text-lg font-semibold text-black-700">CreatedAt</h3>
            <p className="text-gray-900">{user.createdAt.split('T')[0]}</p>
          </div>
          {user.role !== 'admin' && (
            <div>
              <h3 className="text-lg font-semibold text-black-700">
                Subscription
              </h3>
              {user.subscription && user.subscription.status === 'active' ? (
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105">
                  Cancel Subscription
                </button>
              ) : (
                <Link to="/subscribe">
                  <button className="px-4 py-2 bg-zinc-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </Link>
              )}
            </div>
          )}
          <div className="flex space-x-4 mt-4 justify-center" style={{paddingBottom:'20px'}}>
            <Link to="/updateprofile">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105">
                Update Profile
              </button>
            </Link>
            <Link to="/changepassword">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 transform hover:scale-105">
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-center mb-6 text-black-800">
          PlayList
        </h2>
        {user.playlist.length > 0 && (
          <div className="space-y-4 bg-indigo-200 text-center border border-gray rounded-lg shadow-lg" style={{paddingTop: '20px'}}>
            {user.playlist.map(item => (
              <div key={item.course} className="flex items-center space-x-4 " style={{margin:'20px'}}>
                <img
                  src={item.poster}
                  alt="Playlist Img"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <Link to={`/course/${item.course}`}>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                    Watch Now
                  </button>
                </Link>
                <button
                  onClick={() => removeFromPlaylistHandler(item.course)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 flex items-center space-x-2 space-between"
                >
                  <RiDeleteBin7Fill /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default Profile;
