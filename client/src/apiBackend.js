import axios from 'axios';

const VITE_API_BASE_URL = 'http://localhost:5000/api/v1';

export const saveCodeSnippets = data => {
  return axios.post(`${VITE_API_BASE_URL}/codes`, data);
};

export const getAllCodeSnippets = () => {
  return axios.get(`${VITE_API_BASE_URL}/codes`);
};

export const getCodeSnippetsById = id => {
  return axios.get(`${VITE_API_BASE_URL}/codes/${id}`);
};

export const updateCodeSnippet = (id, data) => {
  return axios.put(`${VITE_API_BASE_URL}/codes/${id}`, data);
};

export const deleteCodeSnippet = id => {
  return axios.delete(`${VITE_API_BASE_URL}/codes/${id}`);
};
