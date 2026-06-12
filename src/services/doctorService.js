import api from './api';

export const registerDoctor = async (doctorData) => {
  const response = await api.post('/admin/registro', doctorData);
  return response.data;
};

export const getDoctors = async () => {
  const response = await api.get('/admin/usuarios');
  const data = response.data;
  return Array.isArray(data) ? data.filter((u) => u.rol === 'DOCTOR') : [];
};
