import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import CoursePopUp from './CoursePopUp';
import './admincourses.css';
import { useDispatch, useSelector } from 'react-redux';
import { allCourses, allLectures } from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';
import Footer from '../../layout/Footer';

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
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="adminCoursesContainer flex-grow flex">
                <div className="adminCourses flex-grow p-6">
                    <h1 className="text-3xl font-bold mb-6 text-black">All Available Courses</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-indigo-200 rounded-lg shadow-lg">
                            <thead className="bg-gray-200 text-black uppercase text-sm leading-normal">
                                <tr>
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">Poster</th>
                                    <th className="py-3 px-6 text-left">Title</th>
                                    <th className="py-3 px-6 text-left">Category</th>
                                    <th className="py-3 px-6 text-left">Creator</th>
                                    <th className="py-3 px-6 text-left">Views</th>
                                    <th className="py-3 px-6 text-left">Lectures</th>
                                    <th className="py-3 px-6 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-sm font-light">
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
        <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium">{item._id}</span>
            </td>
            <td className="py-3 px-6 text-left">
                <img src={item.poster.url} alt="poster" className="poster-img" />
            </td>
            <td className="py-3 px-6 text-left">
                <span>{item.title}</span>
            </td>
            <td className="py-3 px-6 text-left">
                <span>{item.category}</span>
            </td>
            <td className="py-3 px-6 text-left">
                <span>{item.createdBy}</span>
            </td>
            <td className="py-3 px-6 text-left">
                <span>{item.views}</span>
            </td>
            <td className="py-3 px-6 text-left">
                <span>{item.numOfVideos}</span>
            </td>
            <td className="py-3 px-6 text-left">
                <div className="flex item-center justify-start space-x-2">
                    <button
                        onClick={() => courseDetail(item._id, item.title)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                        View Lectures
                    </button>
                    <button
                        onClick={() => deleteHandler(item._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}
