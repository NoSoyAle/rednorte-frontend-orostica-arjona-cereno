import axios from "axios";

const API_URL = "http://localhost:8085/api/citas";

export const obtenerHorariosDisponibles = async (
    doctorId,
    fecha
) => {

    const response = await axios.get(
        `${API_URL}/disponibles/${doctorId}/${fecha}`
    );

    return response.data;
};