import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/footer";
import CalendarioSemanal from "./componentes/lilcalendario";
import { Link } from "react-router-dom";

export default function DoctorDashboard() {
    const navigate = useNavigate();
    const fechaActual = new Date();

    const cerrar = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            <Navbar />

            <div className="container-fluid mt-4">

                {/* HEADER */}
                <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm mb-4 text-center">
                    <h1>Bienvenido al panel de control del doctor</h1>
                    <p>Gestiona tus citas, agenda y actividades del día.</p>

                    <h3>Estamos a <span>{fechaActual.toLocaleDateString('es-CL')}</span></h3>
                    <h3>Son las <span>{fechaActual.toLocaleTimeString('es-CL')}</span></h3>
                </div>

                {/* BODY */}
                <div className="row">

                    {/* IZQUIERDA */}
                    <div className="col-md-3">

                        {/* CARD ARRIBA */}
                        <div className="card text-bg-light shadow-sm mb-1">
                            <div className="card-header">
                                Próximo Paciente
                            </div>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Paciente: Juan Pérez</li>
                                <li className="list-group-item">Hora: 10:30</li>
                                <li className="list-group-item">Motivo: Control general</li>
                            </ul>
                        </div>
                        <div className="mb-3 d-flex gap-2 justify-content-between">
                            <a href="#" className="btn btn-primary" style={{ width: '44%', margin: '1 1%' }}>Iniciar Consulta</a>
                            <a href="#" className="btn btn-danger" style={{ width: '44%', margin: '1 1%' }}>Paciente no asiste</a>
                        </div>

                        

                        {/* ACCESOS RÁPIDOS */}
                        <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm">
                            <h3>Accesos Rápidos</h3>

                            <div className="d-flex flex-column gap-3 mt-3">
                                <Link to="/AgendaDia" className="btn btn-outline-primary w-100">
                                    Ver Agenda de hoy
                                </Link>

                                <Link to="/AgendaMensual" className="btn btn-outline-primary w-100">
                                    Ver Agenda mensual
                                </Link>

                                <button
                                    className="btn btn-outline-danger w-100"
                                    onClick={cerrar}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* DERECHA */}
                    <div className="col-md-9">

                        <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm">
                            <h3>Calendario</h3>
                            <CalendarioSemanal />
                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}