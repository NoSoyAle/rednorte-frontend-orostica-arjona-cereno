import React, { useState } from "react";

export default function PasoRut({
    siguiente,
    setPaciente
}) {

    const [rut, setRut] = useState("");

    const buscarPaciente = () => {

        setPaciente({
            rut
        });

        siguiente();
    };

    return (

        <div className="card shadow">

            <div className="card-body">

                <h3>
                    Ingrese su RUT
                </h3>

                <input
                    className="form-control mt-3"
                    value={rut}
                    onChange={(e) =>
                        setRut(e.target.value)
                    }
                />

                <button
                    className="btn btn-primary mt-3"
                    onClick={buscarPaciente}
                >
                    Buscar
                </button>

            </div>

        </div>

    );

}