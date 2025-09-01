import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL ;


const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/register', userData),
};


export const taskAPI = {
  getAllTasks: () => api.get('/getTask'),
  createTask: (taskData) => api.post('/create', taskData),
  updateTask: (id, taskData) => api.patch(`/${id}`, taskData),
  deleteTask: (id) => api.delete(`/${id}`),
  getTask: (id) => api.get(`/${id}`),
};

export default api;
