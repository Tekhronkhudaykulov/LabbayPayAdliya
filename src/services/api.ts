import axios from 'axios';

const api = axios.create({
  baseURL: 'http://5.182.26.107:4000', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});



// Interceptor qo‘shish mumkin (token uchun)
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default api;