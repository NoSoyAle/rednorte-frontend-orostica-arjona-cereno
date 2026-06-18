import React from "react";

export default function PasoPaciente({
    paciente,
    setPaciente,
    siguiente,
    volver
}) {

    return (

        <div className="card shadow">

            <div className="card-body">

                <h3>
                    Datos del Paciente
                </h3>

                <input
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={paciente?.nombre || ""}
                    onChange={(e) =>
                        setPaciente({
                            ...paciente,
                            nombre:
                                e.target.value
                        })
                    }
                />

                <input
                    className="form-control mb-2"
                    placeholder="Apellido"
                />

                <input
                    className="form-control mb-2"
                    placeholder="Correo"
                />

                <input
                    className="form-control mb-2"
                    placeholder="Teléfono"
                />

                <div className="d-flex justify-content-between">

                    <button
                        className="btn btn-secondary"
                        onClick={volver}
                    >
                        ←
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={siguiente}
                    >
                        →
                    </button>

                </div>

            </div>

        </div>

    );

}