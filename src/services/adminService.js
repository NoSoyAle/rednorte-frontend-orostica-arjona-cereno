import api from './api';

export const getAdminRegistro = async () => {
  const response = await api.get('/admin/registro');
  return response.data;
};
