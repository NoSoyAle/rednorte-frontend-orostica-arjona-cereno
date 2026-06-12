import api from './api';

export const authService = {
  login: async (nombre, password) => {
    const response = await api.post('/auth/login', { nombre, password });
    const { token, role, nombre: userName } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ nombre: userName, role }));

    return { token, role, nombre: userName };
  },

  register: async (rut, nombre, password) => {
    const response = await api.post('/auth/registro', { rut, nombre, password });
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },
};
