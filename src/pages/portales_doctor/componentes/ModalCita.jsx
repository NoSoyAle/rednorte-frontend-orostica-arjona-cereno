import React from "react";
import {generarAtencionTxt} from "../../../utils/GenerarAtencion";



export default function ModalAtencion({
    cita,
    atencion,
    setAtencion,
    finalizar
}) {

    return (
        <div
            className="modal fade"
            id="modalAtencion"
            tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Atención Médica
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        />
                    </div>
                    <div className="modal-body">
                        {cita && (
                            <>
                                <h5>
                                    Datos del paciente
                                </h5>
                                <p>
                                    <strong>Nombre:</strong>{" "}{cita.nombrePaciente}
                                </p>
                                <p>
                                    <strong>Rut:</strong>{" "}{cita.rutPaciente}
                                </p>
                                <p>
                                    <strong>Fecha:</strong>{" "}{cita.fecha}
                                </p>
                                <p>
                                    <strong>Hora:</strong>{" "}{cita.horaInicio}
                                </p>
                                <hr />
                                <label>Motivo consulta</label>
                                <textarea
                                    className="form-control mb-3"
                                    value={atencion.motivo
                                    }onChange={(e) =>
                                        setAtencion({
                                            ...atencion,
                                            motivo:
                                                e.target.value
                                        })
                                    }
                                />
                                <label>Diagnóstico</label>
                                <textarea
                                    className="form-control mb-3"
                                    value={atencion.diagnostico
                                    }onChange={(e) =>
                                        setAtencion({
                                            ...atencion,
                                            diagnostico:
                                                e.target.value
                                        })
                                    }
                                />
                                <label>Medicamentos</label>
                                <textarea
                                    className="form-control mb-3"
                                    value={atencion.medicamentos
                                    }onChange={(e) =>
                                        setAtencion({
                                            ...atencion,
                                            medicamentos:
                                                e.target.value
                                        })
                                    }
                                />
                                <label>
                                    Derivación
                                </label>
                                <textarea
                                    className="form-control mb-3"
                                    value={atencion.derivacion
                                    }onChange={(e) =>
                                        setAtencion({
                                            ...atencion,
                                            derivacion:
                                                e.target.value
                                        })
                                    }
                                />
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={
                                            atencion.licencia
                                        }
                                        onChange={(e) =>
                                            setAtencion({
                                                ...atencion,
                                                licencia:
                                                    e.target.checked
                                            })
                                        }
                                    />
                                    <label className="form-check-label">
                                        Licencia médica
                                    </label>
                                </div>
                                {
                                    atencion.licencia && (
                                        <textarea
                                            className="form-control mt-2"
                                            placeholder="Detalle licencia"
                                            value={atencion.detalleLicencia
                                            }onChange={(e) =>
                                                setAtencion({
                                                    ...atencion,
                                                    detalleLicencia:
                                                        e.target.value
                                                })
                                            }
                                        />
                                    )
                                }
                                <label className="mt-3">
                                    Indicaciones
                                </label>
                                <textarea
                                    className="form-control mb-3"
                                    value={atencion.indicaciones}
                                    onChange={(e) =>
                                        setAtencion({
                                            ...atencion,
                                            indicaciones:
                                                e.target.value
                                        })
                                    }
                                />
                                <label>
                                    Comentarios
                                </label>
                                <textarea
                                    className="form-control"
                                    value={atencion.comentarios}
                                    onChange={(e) =>
                                        setAtencion({
                                            ...atencion,
                                            comentarios:
                                                e.target.value
                                        })
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-success"
                            onClick={finalizar}>
                                Finalizar Cita</button>
                    </div>
                </div>
            </div>
        </div>
    );
}