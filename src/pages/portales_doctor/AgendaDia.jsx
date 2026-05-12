import React, { useState } from 'react';
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/footer";

export default function AgendaDiaria() {

    const [pacientes, setPacientes] = useState([
        { id: 1, hora: "09:00", nombre: "Juan Pérez", tipo: "Consulta", estado: "atendido" },
        { id: 2, hora: "09:30", nombre: "María González", tipo: "Cirugía", estado: "pendiente" },
        { id: 3, hora: "10:00", nombre: "Carlos Díaz", tipo: "Consulta", estado: "atendido" },
        { id: 4, hora: "10:30", nombre: "Ana Rojas", tipo: "Consulta", estado: "pendiente" }
    ]);

    const marcarNoAsistio = (id) => {
        setPacientes(prev =>
            prev.map(p =>
                p.id === id ? { ...p, estado: "no_asistio" } : p
            )
        );
    };

    const total = pacientes.length;

    const procesados = pacientes.filter(
        p => p.estado === "atendido" || p.estado === "no_asistio"
    ).length;

    const progreso = (procesados / total) * 100;

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                {/* HEADER */}
                <div className="bg-light p-4 rounded shadow-sm mb-4 text-center">
                    <h2>Agenda Diaria</h2>
                    <p>Control de pacientes del día</p>

                    {/* PROGRESS BAR */}
                    <div className="progress mt-3" style={{ height: "25px" }}>
                        <div
                            className="progress-bar bg-success"
                            style={{ width: `${progreso}%` }}
                        >
                            {Math.round(progreso)}% del día
                        </div>
                    </div>
                </div>

                {/* LISTA */}
                <div className="list-group shadow-sm">

                    {pacientes.map((p) => (
                        <div
                            key={p.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >

                            {/* INFO PACIENTE */}
                            <div>
                                <strong>#{p.id}</strong> — {p.hora} — {p.nombre}

                                <span className="ms-2 badge bg-secondary">
                                    {p.tipo}
                                </span>
                            </div>

                            {/* ESTADO + ACCIONES */}
                            <div className="d-flex align-items-center gap-2">

                                {p.estado === "atendido" && (
                                    <span className="badge bg-success">Atendido</span>
                                )}

                                {p.estado === "pendiente" && (
                                    <span className="badge bg-warning text-dark">Pendiente</span>
                                )}

                                {p.estado === "no_asistio" && (
                                    <span className="badge bg-danger">No asistió</span>
                                )}

                                {/* BOTÓN X */}
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    title="Paciente no asistió"
                                    onClick={() => marcarNoAsistio(p.id)}
                                >
                                    ✕
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

            <Footer />
        </>
    );
}