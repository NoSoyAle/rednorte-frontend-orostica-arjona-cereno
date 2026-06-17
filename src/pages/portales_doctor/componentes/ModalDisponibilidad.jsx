import { useState } from "react";

export default function ModalDisponibilidad({
    doctorId,
    onGuardar
}) {

    const [diasSeleccionados, setDiasSeleccionados] =
        useState([]);

    const [turno, setTurno] =
        useState("AM");

    const [duracionMinutos, setDuracionMinutos] =
        useState(20);

    const dias = [
        "LUNES",
        "MARTES",
        "MIERCOLES",
        "JUEVES",
        "VIERNES",
        "SABADO",
        "DOMINGO"
    ];

    const toggleDia = (dia) => {

        if (
            diasSeleccionados.includes(dia)
        ) {

            setDiasSeleccionados(
                diasSeleccionados.filter(
                    d => d !== dia
                )
            );

        } else {

            setDiasSeleccionados([
                ...diasSeleccionados,
                dia
            ]);

        }
    };

    const seleccionarTodos = () => {

        setDiasSeleccionados(dias);

    };

    const limpiar = () => {

        setDiasSeleccionados([]);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (diasSeleccionados.length === 0) {
            alert(
                "Debe seleccionar al menos un día"
            );
            return;
        }
        let horaInicio = "";
        let horaFin = "";
        switch (turno) {
            case "AM":
                horaInicio = "06:00:00";
                horaFin = "12:00:00";
                break;
            case "MEDIODIA":
                horaInicio = "12:00:00";
                horaFin = "18:00:00";
                break;
            case "PM":
                horaInicio = "18:00:00";
                horaFin = "21:00:00";
                break;
            default:
                return;
        }
        const disponibilidades =
            diasSeleccionados.map(dia => ({
                doctor: {
                    id: doctorId
                },
                diaSemana: dia,
                horaInicio,
                horaFin,
                duracionMinutos,
                activo: true
            }));
        await onGuardar(
            disponibilidades
        );
    };
    return (
        <div
            className="modal fade"
            id="modalDisponibilidad"
            tabIndex="-1"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Configurar Disponibilidad
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <h6>
                                Seleccione los días
                            </h6>
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-success me-2"
                                    onClick={
                                        seleccionarTodos
                                    }
                                >
                                    Todos
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={limpiar}
                                >
                                    Limpiar
                                </button>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                {dias.map(dia => (
                                    <button
                                        key={dia}
                                        type="button"
                                        className={
                                            diasSeleccionados.includes(dia)
                                                ? "btn btn-primary"
                                                : "btn btn-outline-primary"
                                        }
                                        onClick={() =>
                                            toggleDia(dia)
                                        }
                                    >
                                        {dia}
                                    </button>
                                ))}
                            </div>
                            <hr />
                            <h6>
                                Turno
                            </h6>
                            <select
                                className="form-select"
                                value={turno}
                                onChange={(e) =>
                                    setTurno(
                                        e.target.value
                                    )
                                }
                            >
                                <option value="AM">
                                    AM (06:00 - 12:00)
                                </option>
                                <option value="MEDIODIA">
                                    Medio Día (12:00 - 18:00)
                                </option>
                                <option value="PM">
                                    PM (18:00 - 21:00)
                                </option>
                            </select>
                            <hr />
                            <h6>
                                Duración de la cita
                            </h6>
                            <select
                                className="form-select"
                                value={duracionMinutos}
                                onChange={(e) =>
                                    setDuracionMinutos(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            >
                                <option value={15}>
                                    15 minutos
                                </option>
                                <option value={20}>
                                    20 minutos
                                </option>
                                <option value={30}>
                                    30 minutos
                                </option>
                            </select>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Guardar Disponibilidad
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}