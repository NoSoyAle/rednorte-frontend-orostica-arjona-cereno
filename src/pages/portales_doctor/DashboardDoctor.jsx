import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    Link
} from "react-router-dom";

import Navbar from "./componentes/Navbar";
import Footer from "./componentes/footer";
import CalendarioSemanal from "./componentes/lilcalendario";
import ModalDisponibilidad from "./componentes/ModalDisponibilidad";

import {
    obtenerCitasDoctor,
    actualizarCita
} from "../../services/citaService";

import {
    crearDisponibilidad
} from "../../services/disponibilidadService";

export default function DoctorDashboard() {

    const navigate = useNavigate();

    const [fechaActual, setFechaActual] =
        useState(new Date());

    const [citas, setCitas] =
        useState([]);

    const [proximaCita, setProximaCita] =
        useState(null);

    // TEMPORAL
    const doctorId = 8;

    const cerrar = () => {

        localStorage.clear();

        navigate("/");

    };

    useEffect(() => {

        const intervalo = setInterval(() => {

            setFechaActual(new Date());

        }, 1000);

        return () =>
            clearInterval(intervalo);

    }, []);

    useEffect(() => {

        cargarCitas();

    }, []);

    const cargarCitas = async () => {

        try {

            const data =
                await obtenerCitasDoctor(
                    doctorId
                );

            setCitas(data);

            obtenerProxima(data);

        } catch (error) {

            console.error(
                "Error obteniendo citas",
                error
            );

        }

    };

    const obtenerProxima = (
        listaCitas
    ) => {

        const ahora = new Date();

        const futuras =
            listaCitas.filter(cita => {

                const fechaHora =
                    new Date(
                        `${cita.fecha}T${cita.horaInicio}`
                    );

                return fechaHora > ahora;

            });

        futuras.sort((a, b) => {

            const fechaA =
                new Date(
                    `${a.fecha}T${a.horaInicio}`
                );

            const fechaB =
                new Date(
                    `${b.fecha}T${b.horaInicio}`
                );

            return fechaA - fechaB;

        });

        if (futuras.length > 0) {

            setProximaCita(
                futuras[0]
            );

        } else {

            setProximaCita(
                null
            );

        }

    };

    const cancelarCita =
        async (cita) => {

            try {

                const citaActualizada = {

                    ...cita,

                    estado: "CANCELADA"

                };

                await actualizarCita(
                    cita.id,
                    citaActualizada
                );

                alert(
                    "Cita cancelada"
                );

                cargarCitas();

            } catch (error) {

                console.error(error);

                alert(
                    "No fue posible cancelar la cita"
                );

            }

        };

    const guardarDisponibilidad =
        async (disponibilidades) => {

            try {

                for (
                    const disponibilidad
                    of disponibilidades
                ) {

                    await crearDisponibilidad(
                        disponibilidad
                    );

                }

                alert(
                    "Disponibilidad guardada correctamente"
                );

            } catch (error) {

                console.error(error);

                alert(
                    "Error guardando disponibilidad"
                );

            }

        };

    return (
        <>
            <Navbar />

            <div className="container-fluid mt-4">

                {/* HEADER */}

                <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm mb-4 text-center">

                    <h1>
                        Bienvenido al panel del doctor
                    </h1>

                    <p>
                        Gestiona tus citas,
                        agenda y disponibilidad
                    </p>

                    <h3>
                        Estamos a{" "}
                        {
                            fechaActual.toLocaleDateString(
                                "es-CL"
                            )
                        }
                    </h3>

                    <h3>
                        Son las{" "}
                        {
                            fechaActual.toLocaleTimeString(
                                "es-CL"
                            )
                        }
                    </h3>

                </div>

                <div className="row">

                    {/* PANEL IZQUIERDO */}

                    <div className="col-md-3">

                        <div className="card shadow-sm mb-3">

                            <div className="card-header">
                                Próximo Paciente
                            </div>

                            <ul className="list-group list-group-flush">

                                {proximaCita ? (

                                    <>
                                        <li className="list-group-item">
                                            Fecha:
                                            {" "}
                                            {proximaCita.fecha}
                                        </li>

                                        <li className="list-group-item">
                                            Hora:
                                            {" "}
                                            {proximaCita.horaInicio}
                                        </li>

                                        <li className="list-group-item">
                                            Paciente ID:
                                            {" "}
                                            {proximaCita.pacienteId}
                                        </li>

                                        <li className="list-group-item">
                                            Estado:
                                            {" "}
                                            {proximaCita.estado}
                                        </li>

                                    </>

                                ) : (

                                    <li className="list-group-item">
                                        No existen citas próximas
                                    </li>

                                )}

                            </ul>

                        </div>

                        <div className="d-flex gap-2 mb-3">

                            <button
                                className="btn btn-primary flex-fill"
                            >
                                Iniciar Consulta
                            </button>

                            <button
                                className="btn btn-danger flex-fill"
                                disabled={!proximaCita}
                                onClick={() =>
                                    cancelarCita(
                                        proximaCita
                                    )
                                }
                            >
                                Cancelar
                            </button>

                        </div>

                        <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm">

                            <h4>
                                Accesos rápidos
                            </h4>

                            <div className="d-flex flex-column gap-2 mt-3">

                                <Link
                                    to="/AgendaDia"
                                    className="btn btn-outline-primary"
                                >
                                    Agenda de hoy
                                </Link>

                                <button
                                    className="btn btn-outline-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalDisponibilidad"
                                >
                                    Configurar Turnos
                                </button>

                                <Link
                                    to="/AgendaMensual"
                                    className="btn btn-outline-primary"
                                >
                                    Agenda mensual
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* PANEL DERECHO */}

                    <div className="col-md-9">

                        <div className="bg-light border border-dark-subtle rounded p-4 shadow-sm">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h3>
                                    Agenda semanal
                                </h3>

                                <span className="badge text-bg-primary">
                                    {citas.length}
                                    {" "}
                                    citas
                                </span>

                            </div>

                            <CalendarioSemanal
                                citas={citas}
                            />

                        </div>

                    </div>

                </div>

            </div>

            <ModalDisponibilidad
                doctorId={doctorId}
                onGuardar={
                    guardarDisponibilidad
                }
            />

            <Footer />

        </>
    );
}