import axios from 'axios';
import { server } from '../store'; // Import the server URL from the store

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    console.log('Sending login request:', { email, password });

    const { data } = await axios.post(
      `${server}/login`, // Use the server URL
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    console.log('Login successful:', data);

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    console.error(
      'Login failed:',
      error.response?.data?.message || error.message
    );

    dispatch({ type: 'loginFail', payload: error.response?.data?.message });
  }
};

export const registerForm = formData => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    console.log('Sending registration request with formData:', formData);

    const { data } = await axios.post(
      `${server}/register`, // Use the server URL
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    console.log('Registration successful:', data);

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    console.error(
      'Registration failed:',
      error.response?.data?.message || error.message
    );

    dispatch({ type: 'registerFail', payload: error.response?.data?.message });
  }
};

export const getProfile = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response?.data?.message });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });

    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response?.data?.message });
  }
};

export const forgetPassword = email => async dispatch => {
  try {
    dispatch({ type: 'forgetPasswordRequest' });

    const { data } = await axios.post(
      `${server}/forgetpassword`, // Use the server URL
      { email },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'forgetPasswordFail',
      payload: error.response?.data?.message,
    });
  }
};

export const resetPassword = (token, password) => async dispatch => {
  try {
    dispatch({ type: 'resetPasswordRequest' });

    const { data } = await axios.put(
      `${server}/resetpassword/${token}`, // Use the server URL
      { password },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'resetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response?.data?.message,
    });
  }
};
