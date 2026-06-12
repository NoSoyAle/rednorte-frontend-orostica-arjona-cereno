import api from './api';

export const agendaService = {
  getDoctores: async () => {
    const response = await api.get('/api/doctor');
    return response.data;
  },

  getDoctorById: async (id) => {
    const response = await api.get(`/api/doctor/${id}`);
    return response.data;
  },

  createDoctor: async (doctorData) => {
    const response = await api.post('/api/doctor', doctorData);
    return response.data;
  },

  getEspecialidades: async () => {
    const response = await api.get('/api/especialidad');
    return response.data;
  },

  getBloques: async () => {
    const response = await api.get('/api/bloques');
    return response.data;
  },

  getBloquesByDoctorAndFecha: async (doctorId, fecha) => {
    const response = await api.get(`/api/bloques/doctor/${doctorId}/fecha/${fecha}`);
    return response.data;
  },
};
