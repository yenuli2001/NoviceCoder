import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducer/userReducer';
import { profileReducer } from './reducer/profileReducer';
import { courseReducer } from './reducer/courseReducer';
import { adminReducer } from './reducer/adminReducer';
import { contactReducer } from './reducer/contactReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    admin: adminReducer,
    contact: contactReducer,
  },
});

export default store;

export const server = 'http://localhost:5000/api/v1';
