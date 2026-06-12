import api from './api';

export const citasService = {
  obtenerEstadisticas: async () => {
    const response = await api.get('/api/citas/dashboard/estadisticas');
    return response.data;
  },

  obtenerCitasCanceladas: async () => {
    const response = await api.get('/api/citas/canceladas');
    return response.data;
  },

  obtenerCitasRealizadas: async () => {
    const response = await api.get('/api/citas/realizadas');
    return response.data;
  },

  obtenerCitasProgramadas: async () => {
    const response = await api.get('/api/citas/programadas');
    return response.data;
  }
};
