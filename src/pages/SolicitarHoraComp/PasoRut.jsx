import React, { useState } from "react";
import { buscarPacientePorRut} from "../../services/pacienteService2";

export default function PasoRut({
    siguiente,
    setPaciente
}) {

    const [rut, setRut] =
        useState("");

    const [cargando, setCargando] =
        useState(false);

    const buscarPaciente =
        async () => {
            if (!rut.trim()) {
                alert(
                    "Ingrese un RUT"
                );
                return;
            }
            try {
                setCargando(true);
                const paciente =
                    await buscarPacientePorRut(
                        rut
                    );
                setPaciente(
                    paciente
                );
            } catch {
                setPaciente({
                    rut: rut,
                    nombre: "",
                    apellido: "",
                    email: "",
                    telefono: "",
                    direccion: "",
                    fechaNacimiento: ""
                });
            } finally {
                setCargando(false);
            }
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
                    placeholder="12.345.678-9"
                    value={rut}
                    onChange={(e) =>
                        setRut(
                            e.target.value
                        )
                    }
                />
                <button
                    className="btn btn-primary mt-3"
                    onClick={buscarPaciente}
                    disabled={cargando}
                >
                    {
                        cargando
                            ? "Buscando..."
                            : "Continuar"
                    }
                </button>
            </div>
        </div>
    );

}