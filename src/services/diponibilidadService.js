import axios from "axios";
const API_URL ="http://localhost:8085/api/disponibilidad";

export const crearDisponibilidad =
    async (disponibilidad) => {

        const response =
            await axios.post(
                API_URL,
                disponibilidad
            );

        return response.data;
    };