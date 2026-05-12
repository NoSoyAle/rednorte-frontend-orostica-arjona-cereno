const API_URL = 'http://localhost:8080';

export async function obtenerDoctores() {

    const response = await fetch(`${API_URL}/doctores`);

    if (!response.ok) {
        throw new Error('Error al obtener doctores');
    }

    return await response.json();
}