import React, {useEffect,useState} from "react";

import {obtenerHorariosDisponibles} from "../../services/citaService";

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
        fechaSeleccionada,
        doctor
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

                setHorarios([]);

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
                        min={new Date().toISOString().split("T")[0]}
                        type="date"
                        className="form-control"
                        value={
                            fechaSeleccionada || ""
                        }
                        onChange={(e) => {

                            setFechaSeleccionada(
                                e.target.value
                            );

                            setHoraSeleccionada(
                                null
                            );

                        }}
                    />

                </div>

                {fechaSeleccionada && (

                    <>

                        <h5>
                            Horarios disponibles
                        </h5>

                        {horarios.length > 0 ? (

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

                        ) : (

                            <div
                                className="
                                mt-4
                                text-center"
                            >

                                <div
                                    className="
                                    alert
                                    alert-warning"
                                >
                                    Este doctor no tiene
                                    horarios disponibles
                                    para el día
                                    <strong>
                                        {" "}
                                        {fechaSeleccionada}
                                    </strong>
                                </div>

                                <h4
                                    className="
                                    text-muted"
                                >
                                    Elige otro doctor
                                    u otra fecha
                                </h4>

                            </div>

                        )}

                    </>

                )}

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