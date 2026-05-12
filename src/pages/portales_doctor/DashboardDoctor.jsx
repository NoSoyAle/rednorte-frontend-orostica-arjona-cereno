import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/footer";
import Calendario from "./componentes/calendario";


export default function DoctorDashboard() {
    const navigate = useNavigate();
    const cerrar = () => { localStorage.clear(); navigate('/'); };
    const fechaActual = new Date();


    return(
        <>
        <Navbar />
            <div className="container-fluid mt-4 ">
                <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm mb-4 text-center">
                    <h1>Bienvenido al panel de control del doctor</h1>
                    <p> Aquí puedes gestionar tus citas, ver tu agenda y acceder a otras funcionalidades importantes próximamente.</p>
                    <h3>
                        Hoy estamos a{" "}
                        <span>
                            {fechaActual.toLocaleDateString('es-CL')}
                        </span>
                    </h3>
                    <h3>
                        Son las{" "}
                        <span>
                            {fechaActual.toLocaleTimeString('es-CL')}
                        </span>
                    </h3>
                </div>

                <div className="row">
                    {/* <!-- PANEL IZQUIERDO CON BOTONES --> */}

                    <div className="col-md-6">
                        <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm">
                            <div className="d-flex flex-column align-items-center gap-3">
                                
                                    <button className="btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" style={{ width: '33%' }}>
                                        Próximo Paciente
                                    </button>
                                

                                <div className="collapse" id="collapseExample">
                                    <div className="card card-body">
                                        <p>[info paciente]</p>
                                    </div>
                                </div>


                                <button className="btn btn-outline-primary" style={{ width: '33%' }}>
                                    Ver Agenda de hoy
                                </button>
                                <button className="btn btn-outline-primary" style={{ width: '33%' }}>
                                    Horas Libres
                                </button>

                                <button className="btn btn-outline-danger" style={{ width: '33%' }}>
                                    Cancelaciones
                                </button>

                

                            </div>

                        </div>

                    </div>

                    {/*<!-- PANEL DERECHO -->*/}
                    <div className="col">

                        <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm h-100">

                            <h3>Calendario</h3>
                            <Calendario />

                        </div>

                    </div>

                </div>

            </div>
            <Footer/>
        </>
)};