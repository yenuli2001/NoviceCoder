import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import './admincourses.css'; 
import { BsImageAlt } from 'react-icons/bs';
import { updateCourse, getCourseDetails } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Footer from '../../layout/Footer';
import { useParams } from 'react-router-dom';

const UpdateCourse = () => {
  const [title, setTitle] = useState('Random');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');

  const { id } = useParams(); // Get course ID from the URL
  console.log("course id:", id);
  const dispatch = useDispatch();
  const { courseDetail: course, message, error} = useSelector(state => state.admin);
  console.log("Redux course state:", course);
  const categories = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Game Development',
    'Mobile App Dev',
  ];

  // Fetch course details when the component loads
  useEffect(() => {
    dispatch(getCourseDetails(id));
  }, [dispatch, id]);

  // Pre-fill form when course data is loaded
  useEffect(() => {
    if (course) {
      setTitle(course.title);
    //   console.log(setTitle);
      setDescription(course.description);
      setCreatedBy(course.createdBy);
      setSelectedCategory(course.category);
      setAvatarPreview(course.poster ? course.poster.url : '');
    }
  }, [course]);

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

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', selectedCategory);
    myForm.append('createdBy', createdBy);

    if (avatar) {
      myForm.append('file', avatar); // Only append the avatar if a new one is uploaded
    }

    dispatch(updateCourse(id, myForm)); // Use updateCourse action and pass the course ID
  };

  // Handling error and success messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  // Loading state handling
//   if (loading) {
//     return <div>Loading...</div>; // Loading message while fetching course details
//   }

//   if (!course) {
//     return <div>No course found.</div>; // Handling case where course is not found
//   }
  return (
    <>
      <div className="mt-8 p-6 border rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col p-4 md:flex-row">
          <div className="w-full p-6 bg-indigo-200 rounded-lg shadow-md md:w-2/3">
            <h1 className="mb-4 text-3xl font-bold">Update Course</h1>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="flex justify-center mb-4">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <BsImageAlt size={100} className="text-gray-400" />
                )}
              </div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Created By"
                value={createdBy}
                onChange={e => setCreatedBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option>Select Category</option>
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div className="flex justify-center mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Update Course
              </button>
            </form>
          </div>
          <div className="w-full mt-4 md:w-1/3 md:mt-0 md:ml-4">
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default UpdateCourse;
