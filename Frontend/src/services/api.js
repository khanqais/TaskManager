import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
};

// Task API calls
export const taskAPI = {
  getAllTasks: () => api.get('/getTask'),
  createTask: (taskData) => api.post('/create', taskData),
  updateTask: (id, taskData) => api.patch(`/${id}`, taskData),
  deleteTask: (id) => api.delete(`/${id}`),
  getTask: (id) => api.get(`/${id}`),
};

export default api;
