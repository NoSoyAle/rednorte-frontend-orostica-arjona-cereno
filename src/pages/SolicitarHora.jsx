import React, { useState } from "react";

import PasoRut from "../components/solicitarHora/PasoRut";
import PasoPaciente from "../components/solicitarHora/PasoPaciente";
import PasoDoctor from "../components/solicitarHora/PasoDoctor";
import PasoFechaHora from "../components/solicitarHora/PasoFechaHora";
import PasoConfirmacion from "../components/solicitarHora/PasoConfirmacion";

export default function SolicitarHora() {

    const [paso, setPaso] = useState(1);

    const [paciente, setPaciente] = useState(null);

    const [doctorSeleccionado,
        setDoctorSeleccionado] = useState(null);

    const [fechaSeleccionada,
        setFechaSeleccionada] = useState(null);

    const [horaSeleccionada,
        setHoraSeleccionada] = useState(null);

    return (

        <div className="container mt-5">

            {paso === 1 && (

                <PasoRut
                    setPaciente={setPaciente}
                    siguiente={() => setPaso(2)}
                />

            )}

            {paso === 2 && (

                <PasoPaciente
                    paciente={paciente}
                    setPaciente={setPaciente}
                    siguiente={() => setPaso(3)}
                    volver={() => setPaso(1)}
                />

            )}

            {paso === 3 && (

                <PasoDoctor
                    setDoctorSeleccionado={
                        setDoctorSeleccionado
                    }
                    siguiente={() => setPaso(4)}
                    volver={() => setPaso(2)}
                />

            )}

            {paso === 4 && (

                <PasoFechaHora
                    doctor={doctorSeleccionado}
                    fechaSeleccionada={
                        fechaSeleccionada
                    }
                    setFechaSeleccionada={
                        setFechaSeleccionada
                    }
                    horaSeleccionada={
                        horaSeleccionada
                    }
                    setHoraSeleccionada={
                        setHoraSeleccionada
                    }
                    siguiente={() => setPaso(5)}
                    volver={() => setPaso(3)}
                />

            )}

            {paso === 5 && (

                <PasoConfirmacion
                    paciente={paciente}
                    doctor={doctorSeleccionado}
                    fecha={fechaSeleccionada}
                    hora={horaSeleccionada}
                />

            )}

        </div>

    );

}