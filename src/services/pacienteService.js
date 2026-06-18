import api from './api';
const API_URL ="http://localhost:8083/api/pacientes";

export const pacienteService = {
  getPacientes: async () => {
    const response = await api.get('/api/pacientes');
    return response.data;
  },

  getPacienteById: async (id) => {
    const response = await api.get(`/api/pacientes/${id}`);
    return response.data;
  },

  createPaciente: async (pacienteData) => {
    const response = await api.post('/api/pacientes', pacienteData);
    return response.data;
  },

  deletePaciente: async (id) => {
    const response = await api.delete(`/api/pacientes/${id}`);
    return response.data;
  },

  getServicios: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/paciente/servicios?${queryParams}` : '/paciente/servicios';
    const response = await api.get(url);
    return response.data;
  },

  getServicioById: async (id) => {
    const response = await api.get(`/paciente/servicios/${id}`);
    return response.data;
  },

  createServicio: async (servicioData) => {
    const response = await api.post('/paciente/servicios', servicioData);
    return response.data;
  },

  updateServicio: async (id, servicioData) => {
    const response = await api.put(`/paciente/servicios/${id}`, servicioData);
    return response.data;
  },

  deleteServicio: async (id) => {
    const response = await api.delete(`/paciente/servicios/${id}`);
    return response.data;
  },
};

