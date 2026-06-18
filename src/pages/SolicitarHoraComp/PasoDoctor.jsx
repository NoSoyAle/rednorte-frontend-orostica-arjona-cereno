import React, {useEffect,useState} from "react";

import {obtenerEspecialidades} from "../../services/especialidadService";

import {obtenerDoctoresPorEspecialidad} from "../../services/doctorServices";

export default function PasoDoctor({
    setDoctorSeleccionado,
    siguiente,
    volver
}) {

    const [
        especialidades,
        setEspecialidades
    ] = useState([]);

    const [
        doctores,
        setDoctores
    ] = useState([]);

    const [
        especialidadSeleccionada,
        setEspecialidadSeleccionada
    ] = useState("");

    const [
        doctorSeleccionado,
        setDoctorLocal
    ] = useState("");

    useEffect(() => {

        cargarEspecialidades();

    }, []);

    const cargarEspecialidades =
        async () => {

            try {

                const data =
                    await obtenerEspecialidades();

                setEspecialidades(data);

            } catch (error) {

                console.error(error);

            }

        };

    const seleccionarEspecialidad =
        async (idEspecialidad) => {

            setEspecialidadSeleccionada(
                idEspecialidad
            );

            setDoctorLocal("");

            try {

                const data =
                    await obtenerDoctoresPorEspecialidad(
                        idEspecialidad
                    );

                setDoctores(data);

            } catch (error) {

                console.error(error);

            }

        };

    const continuar = () => {

        const doctor =
            doctores.find(
                d =>
                    d.id ===
                    Number(
                        doctorSeleccionado
                    )
            );

        if (!doctor) {

            alert(
                "Debe seleccionar un doctor"
            );

            return;

        }

        setDoctorSeleccionado(
            doctor
        );

        siguiente();
    };
    return (
        <div className="card shadow">
            <div className="card-body">
                <h3>
                    Seleccione Doctor
                </h3>
                <div className="mb-3">
                    <label className="form-label">
                        Especialidad
                    </label>
                    <select
                        className="form-select"
                        value={
                            especialidadSeleccionada
                        }
                        onChange={(e) =>
                            seleccionarEspecialidad(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            Seleccione una especialidad
                        </option>
                        {especialidades.map(
                            especialidad => (
                                <option
                                    key={
                                        especialidad.id
                                    }
                                    value={especialidad.id}
                                >
                                    {especialidad.nombreEsp}
                                </option>
                            )
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Doctor
                    </label>
                    <select
                        className="form-select"
                        value={
                            doctorSeleccionado
                        }
                        onChange={(e) =>
                            setDoctorLocal(
                                e.target.value
                            )
                        }
                        disabled={
                            !especialidadSeleccionada
                        }
                    >
                        <option value="">
                            Seleccione un doctor
                        </option>
                        {doctores.map(
                            doctor => (
                                <option
                                    key={doctor.id}
                                    value={doctor.id}
                                >
                                    {doctor.nombre}
                                    {" "}
                                    {doctor.apellido}
                                </option>
                            )
                        )}
                    </select>
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
                        onClick={continuar}
                        disabled={
                            !doctorSeleccionado
                        }
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}