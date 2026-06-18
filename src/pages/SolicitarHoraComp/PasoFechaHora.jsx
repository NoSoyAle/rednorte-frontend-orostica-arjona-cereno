import React, {useEffect,useState} from "react";

import {buscarPacientePorRut}from "../../services/pacienteService2";

export default function PasoFechaHora({
    doctor,
    fechaSeleccionada,
    setFechaSeleccionada,
    horaSeleccionada,
    setHoraSeleccionada,
    siguiente,
    volver
}) {

    const [
        horarios,
        setHorarios
    ] = useState([]);

    useEffect(() => {

        if (
            doctor &&
            fechaSeleccionada
        ) {

            cargarHorarios();

        }

    }, [
        fechaSeleccionada
    ]);

    const cargarHorarios =
        async () => {

            try {

                const data =
                    await obtenerHorariosDisponibles(
                        doctor.id,
                        fechaSeleccionada
                    );

                setHorarios(
                    data
                );

            } catch (error) {

                console.error(error);

            }

        };

    return (

        <div className="card shadow">

            <div className="card-body">

                <h3>
                    Seleccione Fecha y Hora
                </h3>

                <div className="mb-3">

                    <label>
                        Fecha
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        value={
                            fechaSeleccionada || ""
                        }
                        onChange={(e) =>
                            setFechaSeleccionada(
                                e.target.value
                            )
                        }
                    />

                </div>

                {
                    fechaSeleccionada && (

                        <>

                            <h5>
                                Horarios disponibles
                            </h5>

                            <div
                                className="
                                d-flex
                                flex-wrap
                                gap-2
                                mt-3"
                            >

                                {horarios.map(
                                    hora => (

                                        <button
                                            key={hora}
                                            className={
                                                horaSeleccionada === hora
                                                ? "btn btn-success"
                                                : "btn btn-outline-success"
                                            }
                                            onClick={() =>
                                                setHoraSeleccionada(
                                                    hora
                                                )
                                            }
                                        >
                                            {
                                                hora.substring(
                                                    0,
                                                    5
                                                )
                                            }
                                        </button>

                                    )
                                )}

                            </div>

                        </>

                    )
                }

                <div
                    className="
                    d-flex
                    justify-content-between
                    mt-4"
                >

                    <button
                        className="btn btn-secondary"
                        onClick={volver}
                    >
                        ←
                    </button>

                    <button
                        className="btn btn-primary"
                        disabled={
                            !horaSeleccionada
                        }
                        onClick={siguiente}
                    >
                        →
                    </button>

                </div>

            </div>

        </div>

    );

}