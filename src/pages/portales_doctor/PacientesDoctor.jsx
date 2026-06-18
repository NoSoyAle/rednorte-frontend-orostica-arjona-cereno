import React,
{useEffect,useState}from "react";
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/footer";
import {obtenerPacientesDoctor} from "../../services/citaService";

export default function PacientesDoctor() {

    const doctorId = 8;

    const [pacientes,setPacientes] =useState([]);
    useEffect(() => {cargarPacientes();}, []);

    const cargarPacientes =async () => {
        try {

            const data =
                await obtenerPacientesDoctor(
                    doctorId
                );

            setPacientes(data);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="bg-light p-4 rounded shadow-sm mb-4">
                    <h2>
                        Mis Pacientes
                    </h2>
                    <p>
                        Pacientes atendidos
                        previamente
                    </p>
                </div>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        Nombre
                                    </th>
                                    <th>
                                        Rut
                                    </th>
                                    <th>
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pacientes.map(
                                        paciente => (
                                            <tr key={paciente.pacienteId}>
                                                <td>
                                                    {paciente.nombre}
                                                </td>
                                                <td>
                                                    {paciente.rut}
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm">
                                                        Ver Historial
                                                    </button>
                                                </td>
                                            </tr>)
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}