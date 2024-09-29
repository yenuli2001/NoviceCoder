import express from 'express';
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures, getCourseDetails, updateCourse } from '../controllers/courseController.js';
import singleUpload from '../middlewars/multer.js';
import { authorizeAdmin, isAuthenticated } from '../middlewars/auth.js';

const router = express.Router();

//Get all courses without lectures
router.get('/courses', getAllCourses);

//create new course -admin
router.post('/createcourse',isAuthenticated, authorizeAdmin, singleUpload, createCourse);

//add lecture, delete course, get course details
router.get('/course/:id', getCourseLectures);
router.post('/course/:id',isAuthenticated, authorizeAdmin, singleUpload, addLecture);
router.delete('/course/:id',isAuthenticated, authorizeAdmin, deleteCourse);


//delete lecture
router.delete('/lecture',isAuthenticated, authorizeAdmin, deleteLecture);

// Get course details and update course
// router.get('/course/:id', getCourseDetails);
// router.put('/course/:id', isAuthenticated, authorizeAdmin, updateCourse);


//admin
// // Get Admin Dashboard Stats
//router.get('/admin/stats',isAuthenticated, authorizeAdmin, getDashboardStats)

//Get course details
router.get("/courseDetail/:id", getCourseDetails)

//Update User role
router.put("/updateCourse/:id", isAuthenticated, authorizeAdmin, updateCourse)

export default router; 