import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/footer";
import CalendarioGrande from "./componentes/calendario";

export default function AgendaMensual() {

    const navigate = useNavigate();

    const [eventos, setEventos] = useState([
        { title: 'Paciente: Juan Pérez', date: '2026-05-12' },
        { title: 'Control Diabetes', date: '2026-05-15' }
    ]);

    const cerrar = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            <Navbar />

            <div className="d-flex justify-content-end mt-3 me-4">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        const titulo = prompt("Título:");
                        const fecha = prompt("Fecha (YYYY-MM-DD):");

                        if (!titulo || !fecha) return;

                        setEventos([
                            ...eventos,
                            { title: titulo, date: fecha }
                        ]);
                    }}
                >
                    + Agregar evento
                </button>
            </div>

            <CalendarioGrande eventos={eventos} />

            <Footer />
        </>
    );
}