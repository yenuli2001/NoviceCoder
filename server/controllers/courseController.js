import { Course } from '../models/Course.js';
import StatsModel from '../models/stats.js';
import getDataUri from '../utils/dataUri.js';
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewars/catchAsyncError.js";
import mongoose from 'mongoose';


//Get all the courses 

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
  
    const courses = await Course.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
      category: {
        $regex: category,
        $options: "i",
      },
    }).select("-lectures");
    res.status(200).json({
      success: true,
      courses,
    });
  });
  
  export const createCourse = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
  
    if (!title || !description || !category || !createdBy)
      return next(new ErrorHandler("Please add all fields", 400));
  
    const file = req.file;
  
    const fileUri = getDataUri(file);
  
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  
    await Course.create({
      title,
      description,
      category,
      createdBy,
      poster: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });
  
    res.status(201).json({
      success: true,
      message: "Course Created Successfully. You can add lectures now.",
    });
  });
  

  export const getCourseLectures = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
  
    if (!course) return next(new ErrorHandler("Course not found", 404));
  
    course.views += 1;
  
    await course.save();
  
    res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  });
  
  export const addLecture = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
  
    const course = await Course.findById(id);
  
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
  
    const file = req.file;
    const fileUri = getDataUri(file);
  
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      resource_type: "video",
    });
  
    // Ensure that lectures is an array before pushing
    if (!Array.isArray(course.lectures)) {
      course.lectures = [];
    }
  
    course.lectures.push({
      title,
      description,
      video: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });
  
    course.numOfVideos = course.lectures.length;
  
    await course.save();
  
    res.status(200).json({
      success: true,
      message: "Lecture added in Course",
    });
  });
  
export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id).lean();

  if (!course) return next(new ErrorHandler("Course not found", 404));

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

  await Course.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Course Deleted Successfully",
  });
});



  export const deleteLecture = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query;
  
    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler("Course not found", 404));
  
    const lecture = course.lectures.find((item) => {
      if (item._id.toString() === lectureId.toString()) return item;
    });
    await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
      resource_type: "video",
    });
  
    course.lectures = course.lectures.filter((item) => {
      if (item._id.toString() !== lectureId.toString()) return item;
    });
  
    course.numOfVideos = course.lectures.length;
  
    await course.save();
  
    res.status(200).json({
      success: true,
      message: "Lecture Deleted Successfully",
    });
  });
  
  Course.watch().on("change", async () => {
    const stats = await StatsModel.find({}).sort({ createdAt: "desc" }).limit(1);
  
    const courses = await Course.find({});
  
    let totalViews = 0;
  
    for (let i = 0; i < courses.length; i++) {
      totalViews += courses[i].views;
    }
    stats[0].views = totalViews;
    stats[0].createdAt = new Date(Date.now());
  
    await stats[0].save();
  });
  
  // Get course details
  export const getCourseDetails = catchAsyncError(async (req, res, next) => {
      const courseDetail = await Course.findById(req.params.id);
  
      if (!courseDetail) {
          return next(new ErrorHandler("Course not found", 404));
      }
  
      res.status(200).json({
          success: true,
          course: courseDetail,
      });
  });
  
  // Update course details by ID
export const updateCourse = async (req, res) => {
  try {
    const { title, description, category, createdBy } = req.body;
    const courseId = req.params.id;

    // Find the course by ID
    let course = await Course.findById(courseId);
    console.log("course:", course);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update fields
    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.createdBy = createdBy || course.createdBy;

    // Handle avatar update if a new image is uploaded
    if (req.file) {
      // Destroy the old image from Cloudinary if it exists
      if (course.poster && course.poster.public_id) {
        await cloudinary.v2.uploader.destroy(course.poster.public_id);
      }

      // Upload the new image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'course_posters',
        width: 150,
        crop: 'scale',
      });

      // Update the course with the new image URL and public ID
      course.poster = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Save the updated course
    await course.save();

    res.status(200).json({
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('Server error');
    }
  }
};