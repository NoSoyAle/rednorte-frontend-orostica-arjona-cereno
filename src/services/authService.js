import axios from 'axios';

const API = 'http://localhost:8082';

export const login = (rut, password) =>
  axios.post(`${API}/auth/login`, { rut, password });

export const consultarPaciente = (codigo) =>
  axios.get(`${API}/lista-espera/codigo/${codigo}`);

export const register = (rut, nombre, password) =>
  axios.post(`${API}/auth/register`, { rut, nombre, password });
