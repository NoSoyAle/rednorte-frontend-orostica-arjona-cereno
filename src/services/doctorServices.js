import axios from "axios";

const API_URL =
    "http://localhost:8085/api/doctor";

export const obtenerDoctores =
    async () => {

        const response =
            await axios.get(API_URL);

        return response.data;
    };

export const obtenerDoctoresPorEspecialidad =
    async (idEspecialidad) => {

        const response =
            await axios.get(
                `${API_URL}/especialidad/${idEspecialidad}`
            );

        return response.data;
    };