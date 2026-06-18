import axios from "axios";

const API_URL = "http://localhost:8085/api/citas";

export const obtenerCitasDoctor = async (doctorId) => {

    const response = await axios.get(
        `${API_URL}/doctor/${doctorId}`
    );

    return response.data;
};

export const actualizarCita = async (
    id,
    cita
) => {

    const response = await axios.put(
        `${API_URL}/${id}`,
        cita
    );

    return response.data;
};

export const crearCita = async (
    cita
) => {

    const response = await axios.post(
        API_URL,
        cita
    );

    return response.data;
};

export const eliminarCita = async (
    id
) => {

    await axios.delete(
        `${API_URL}/${id}`
    );

};

export const obtenerCitasPorFecha =
async (doctorId, fecha) => {

    const response = await axios.get(
        `${API_URL}/doctor/${doctorId}/fecha/${fecha}`
    );

    return response.data;
};

export const obtenerHorariosDisponibles = async (
    doctorId,
    fecha
) => {

    const response = await axios.get(
        `${API_URL}/disponibles/${doctorId}/${fecha}`
    );

    return response.data;
};

export const obtenerPacientesDoctor =async (doctorId) => {
        const response =await axios.get(`${API_URL}/doctor/${doctorId}/pacientes`
            );return response.data;
    };