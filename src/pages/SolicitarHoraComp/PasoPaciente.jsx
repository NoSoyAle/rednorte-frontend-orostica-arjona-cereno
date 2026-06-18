import React from "react";

import {crearPaciente,actualizarPaciente}from "../../services/pacienteService2";

export default function PasoPaciente({
    paciente,
    setPaciente,
    siguiente,
    volver
}) {

    const guardarPaciente =
        async () => {

            try {

                let resultado;

                if (paciente.id) {

                    resultado =
                        await actualizarPaciente(
                            paciente.id,
                            paciente
                        );

                } else {

                    resultado =
                        await crearPaciente(
                            paciente
                        );

                }

                setPaciente(
                    resultado
                );

                siguiente();

            } catch (error) {

                console.error(error);

                alert(
                    "Error guardando paciente"
                );

            }

        };

    return (

        <div className="card shadow">

            <div className="card-body">

                <h3>
                    Datos del Paciente
                </h3>

                <div className="mb-3">

                    <label>
                        RUT
                    </label>

                    <input
                        className="form-control"
                        value={
                            paciente?.rut || ""
                        }
                        disabled
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Nombre
                    </label>

                    <input
                        className="form-control"
                        value={
                            paciente?.nombre || ""
                        }
                        onChange={(e) =>
                            setPaciente({
                                ...paciente,
                                nombre:
                                    e.target.value
                            })
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Apellido
                    </label>

                    <input
                        className="form-control"
                        value={
                            paciente?.apellido || ""
                        }
                        onChange={(e) =>
                            setPaciente({
                                ...paciente,
                                apellido:
                                    e.target.value
                            })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label>
                        Correo
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        value={
                            paciente?.email || ""
                        }
                        onChange={(e) =>
                            setPaciente({
                                ...paciente,
                                email:
                                    e.target.value
                            })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label>
                        Teléfono
                    </label>
                    <input
                        className="form-control"
                        value={
                            paciente?.telefono || ""
                        }
                        onChange={(e) =>
                            setPaciente({
                                ...paciente,
                                telefono:
                                    e.target.value
                            })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label>
                        Fecha Nacimiento
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        value={
                            paciente?.fechaNacimiento || ""
                        }
                        onChange={(e) =>
                            setPaciente({
                                ...paciente,
                                fechaNacimiento:
                                    e.target.value
                            })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label>
                        Dirección
                    </label>
                    <input
                        className="form-control"
                        value={
                            paciente?.direccion || ""
                        }
                        onChange={(e) =>
                            setPaciente({
                                ...paciente,
                                direccion:
                                    e.target.value
                            })
                        }
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-secondary"
                        onClick={volver}
                    >
                        ←
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={guardarPaciente}
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}