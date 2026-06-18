import axios from "axios";
const API_URL ="http://localhost:8083/api/pacientes";

export const buscarPacientePorRut =
    async (rut) => {

        const response =
            await axios.get(
                `${API_URL}/rut/${rut}`
            );

        return response.data;
    };

export const crearPaciente =
    async (paciente) => {

        const response =
            await axios.post(
                API_URL,
                paciente
            );
        return response.data;
    };

export const actualizarPaciente =
    async (id,paciente) => {
        const response =
            await axios.put(
                `${API_URL}/${id}`,
                paciente
            );
        return response.data;
    };