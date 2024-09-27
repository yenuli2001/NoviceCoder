import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import CoursePopUp from './CoursePopUp';
import './admincourses.css';
import { useDispatch, useSelector } from 'react-redux';
import { allCourses, allLectures } from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';
import Footer from '../../layout/Footer';
import backgroundImage1 from '../../../assets/images/img5.jpeg'; // Import your image here

const AdminCourses = () => {
    const [popupBtn, setPopupBtn] = React.useState(false);
    const [courseId, setCourseId] = React.useState('');
    const [courseTitle, setCourseTitle] = React.useState('');

    const { courses, lectures } = useSelector(state => state.course);
    const { error, message } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    const courseDetail = (courseId, title) => {
        dispatch(allLectures(courseId));
        setCourseId(courseId);
        setCourseTitle(title);
        setPopupBtn(true);
    };

    const deleteHandler = (courseId) => {
        dispatch(deleteCourse(courseId));
    };

    const deleteLectureBtn = async (courseId, lectureId) => {
        await dispatch(deleteLecture(courseId, lectureId));
        dispatch(allLectures(courseId));
    };

    const addLectureHandler = async (title, description, video) => {
        const myForm = new FormData();
        myForm.set('title', title);
        myForm.set('description', description);
        myForm.set('file', video);
        await dispatch(addLecture(courseId, myForm));
        dispatch(allLectures(courseId));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
        dispatch(allCourses());
    }, [dispatch, error, message]);

    return (
        <div style={{ backgroundColor: '#845695', minHeight: '100vh', paddingBottom: '40px' }}>
            <div>
                <img
                    src={backgroundImage1}
                    alt="Header"
                    className="w-full h-64 object-cover"
                    style={{ marginBottom: '20px' }}
                />
            </div>
            <div className="adminCoursesContainer flex-grow flex">
                <div className="adminCourses flex-grow p-6">
                    <h1 style={{ marginTop: 10 }} className="text-4xl font-bold mb-6 text-black">All Available Courses</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead className="bg-purple-700 text-white text-left text-sm uppercase font-semibold tracking-wider text-center">
                                <tr>
                                    <th className="py-3 px-6">ID</th>
                                    <th className="py-3 px-6">Poster</th>
                                    <th className="py-3 px-6">Title</th>
                                    <th className="py-3 px-6">Category</th>
                                    <th className="py-3 px-6">Creator</th>
                                    <th className="py-3 px-6">Views</th>
                                    <th className="py-3 px-6">Lectures</th>
                                    <th className="py-3 px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-sm font-light text-center">
                                {Array.isArray(courses) &&
                                    courses.map((item) => (
                                        <Row
                                            key={item._id}
                                            item={item}
                                            deleteHandler={deleteHandler}
                                            courseDetail={courseDetail}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <CoursePopUp
                        trigger={popupBtn}
                        setTrigger={setPopupBtn}
                        id={courseId}
                        title={courseTitle}
                        addLecture={addLectureHandler}
                        lectures={lectures}
                        deleteBtn={deleteLectureBtn}
                    />
                </div>
                <div className="sidebar">
                    <Sidebar />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminCourses;

function Row({ item, deleteHandler, courseDetail }) {
    return (
        <tr className="border-b border-gray-200 hover:bg-gray-100 text-center">
            <td className="py-3 px-6 whitespace-nowrap">
                <span className="font-medium">{item._id}</span>
            </td>
            <td className="py-3 px-6">
                <img src={item.poster.url} alt="poster" className="poster-img mx-auto" />
            </td>
            <td className="py-3 px-6">
                <span>{item.title}</span>
            </td>
            <td className="py-3 px-6">
                <span>{item.category}</span>
            </td>
            <td className="py-3 px-6">
                <span>{item.createdBy}</span>
            </td>
            <td className="py-3 px-6">
                <span>{item.views}</span>
            </td>
            <td className="py-3 px-6">
                <span>{item.numOfVideos}</span>
            </td>
            <td className="py-3 px-6">
                <div className="flex item-center justify-center space-x-2">
                    <button
                        onClick={() => courseDetail(item._id, item.title)}
                        className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition duration-300 transform hover:scale-105"
                    >
                        View Lectures
                    </button>
                    <button
                        onClick={() => deleteHandler(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}
