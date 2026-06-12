import api from './api';

export const getUsers = async () => {
  const response = await api.get('/admin/usuarios');
  return response.data;
};

export const getUserByRut = async (rut) => {
  const response = await api.get(`/admin/usuarios/${rut}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/admin/usuarios', userData);
  return response.data;
};

export const updateUserStatus = async (id, estado) => {
  const response = await api.put(`/admin/usuarios/${id}/estado`, { estado });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/usuarios/${id}`);
  return response.data;
};

export const getDashboardKpis = async () => {
  const response = await api.get('/admin/dashboard/kpis');
  return response.data;
};
