import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your backend API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the authorization header for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Authentication Endpoints
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// User Endpoints
export const getUsers = () => api.get('/user/');
export const getUserById = (userId) => api.get(`/user/${userId}`);

// Task Endpoints
export const getTasks = (params) => api.get('/tasks/', { params });
export const getTaskById = (taskId) => api.get(`/tasks/${taskId}`);
export const createTask = (taskData) => api.post('/tasks/', taskData);
export const updateTask = (taskId, taskData) => api.put(`/tasks/${taskId}`, taskData);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);

export default api;
