import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const isAuthRequest = config.url?.includes('/auth/login') || config.url?.includes('/auth/registro');
  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('=== ERROR EN RESPUESTA ===');
    console.error('URL:', error.config?.url);
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Token en localStorage:', localStorage.getItem('token'));
    console.error('========================');
    
    return Promise.reject(error);
  }
);

export default api;
