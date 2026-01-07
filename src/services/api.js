import axios from 'axios';

// Create axios instance with base configuration
// Use Vite env variables via `import.meta.env`. Vite exposes variables
// that start with `VITE_` (e.g. `VITE_API_URL`). `process` is undefined
// in the browser when using Vite, which caused the ReferenceError.

const API_BASE_URL = "https://blog-app-backend-production-df67.up.railway.app/api";

// || 'http://localhost:5001/api'


const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
      delete config.headers['content-type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if token is expired
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
};

// Post API calls
export const postAPI = {
  getAllPosts: (params) => api.get('/posts', { params }),
  getPostById: (id) => api.get(`/posts/${id}`),
  createPost: (postData) => api.post('/posts', postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  createPostWithImage: ({ title, content, published, imageFile }) => {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('published', String(!!published));
    if (imageFile) {
      fd.append('image', imageFile);
    }
    return api.post('/posts', fd);
  },
  updatePostWithImage: (id, { title, content, published, imageFile }) => {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('published', String(!!published));
    if (imageFile) {
      fd.append('image', imageFile);
    }
    return api.put(`/posts/${id}`, fd);
  },
  deletePost: (id) => api.delete(`/posts/${id}`),
};