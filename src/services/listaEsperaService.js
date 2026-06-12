import api from './api';

export const listaEsperaService = {
  getSolicitudes: async () => {
    const response = await api.get('/lista-espera');
    return response.data;
  },

  createSolicitud: async (solicitudData) => {
    const response = await api.post('/lista-espera', solicitudData);
    return response.data;
  },

  updateEstado: async (id, estadoData) => {
    const response = await api.put(`/lista-espera/${id}/estado`, estadoData);
    return response.data;
  },

  asignarHora: async (id, asignacionData) => {
    const response = await api.put(`/lista-espera/${id}/asignar`, asignacionData);
    return response.data;
  },
};
