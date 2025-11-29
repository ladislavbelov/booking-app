import axios from 'axios';

const http = axios.create({
  baseURL: '/api', // все запросы пойдут на /api/...
  withCredentials: false,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
