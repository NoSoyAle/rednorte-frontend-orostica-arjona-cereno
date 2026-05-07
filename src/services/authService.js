import axios from 'axios';

const API = 'http://localhost:8083';

export const login = (rut, password) =>
  axios.post(`${API}/auth/login`, { rut, password });

export const consultarPaciente = (codigo) =>
  axios.get(`${API}/lista-espera/codigo/${codigo}`);