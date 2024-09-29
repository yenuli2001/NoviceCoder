import axios from 'axios';
import { server } from '../store';

export const createCourse = formData => async dispatch => {
  try {
    dispatch({ type: 'createCourseRequest' });
    const { data } = await axios.post(`${server}/createcourse`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = id => async dispatch => {
  try {
    dispatch({ type: 'deleteCourseRequest' });
    const { data } = await axios.delete(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};
export const addLecture = (id, formdata) => async dispatch => {
  try {
    dispatch({ type: 'addLectureRequest' });
    const { data } = await axios.post(`${server}/course/${id}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'addLectureFail', payload: error.response.data.message });
  }
};

export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    dispatch({ type: 'deleteLectureRequest' });
    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFail',
      payload: error.response.data.message,
    });
  }
};

// Get course details by ID
export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'getCourseDetailsRequest' }); // Dispatch request action
    const { data } = await axios.get(`${server}/courseDetail/${id}`, {
      withCredentials: true, // Include credentials if needed
    });
    console.log("course id:", data);
    dispatch({
      type: 'getCourseDetailsSuccess',
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: 'getCourseDetailsFail',
      payload: error.response ? error.response.data.message : "Server Error", // Safely access error message
    });
  }
};

// Update course
export const updateCourse = (id, courseData) => async (dispatch) => {
  try {
    dispatch({ type: 'updateCourseRequest' }); // Dispatch request action
    const payload = {};
    courseData.forEach((value, key) => {
      payload[key] = value;
    });
    const { data } = await axios.put(`${server}/updateCourse/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include credentials if needed
    });
    console.log("course:", data);
    dispatch({
      type: 'updateCourseSuccess',
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'updateCourseFail',
      payload: error.response ? error.response.data : "Server Error", // Safely access error message
    });
  }
};


export const allUsers = () => async dispatch => {
  try {
    dispatch({ type: 'allUsersRequest' });
    const { data } = await axios.get(`${server}/admin/users`, {
      withCredentials: true,
    });

    dispatch({ type: 'allUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({ type: 'allUsersFail', payload: error.response.data.message });
  }
};

export const updateUserRole = id => async dispatch => {
  try {
    dispatch({ type: 'updateUserRoleRequest' });
    const { data } = await axios.put(
      `${server}/admin/user/${id}`,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateUserRoleSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserRoleFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    dispatch({ type: 'deleteUserRequest' });
    const { data } = await axios.delete(`${server}/admin/user/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'deleteUserFail', payload: error.response.data.message });
  }
};

export const dashboardStats = () => async dispatch => {
  try {
    dispatch({ type: 'adminStatsRequest' });
    const { data } = await axios.get(`${server}/admin/stats`, {
      withCredentials: true,
    });

    console.log(data);

    dispatch({ type: 'adminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'adminStatsFail', payload: error.response.data.message });
  }
};
