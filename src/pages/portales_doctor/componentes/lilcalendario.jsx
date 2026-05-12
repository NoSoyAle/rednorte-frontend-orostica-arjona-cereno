import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import * as bootstrap from 'bootstrap';

export default function CalendarioSemanal() {

    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

    const eventos = [
        {
            title: 'María González',
            start: '2026-05-12T09:00:00',
            end: '2026-05-12T09:15:00',

            extendedProps: {
                edad: 42,
                tipo: 'Consulta General',
                correo: 'maria@gmail.com',
            }
        }
    ];

    function manejarEventoClick(info) {

        setEventoSeleccionado({
            nombre: info.event.title,
            hora: info.event.start.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            edad: info.event.extendedProps.edad,
            tipo: info.event.extendedProps.tipo,
            correo: info.event.extendedProps.correo
        });

        const modal = new bootstrap.Modal(
            document.getElementById('modalEvento')
        );

        modal.show();
    }

    return (
        <>
            <div className="bg-white p-3 rounded shadow-sm">

                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    locale={esLocale}
                    height="700px"
                    events={eventos}
                    eventClick={manejarEventoClick}
                    allDaySlot={false}
                />

            </div>

            {/* MODAL */}

            <div
                className="modal fade"
                id="modalEvento"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">
                                Detalle de cita
                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            {eventoSeleccionado && (
                                <>
                                    <p>
                                        <strong>Paciente:</strong>{' '}
                                        {eventoSeleccionado.nombre}
                                    </p>

                                    <p>
                                        <strong>Edad:</strong>{' '}
                                        {eventoSeleccionado.edad}
                                    </p>

                                    <p>
                                        <strong>Hora:</strong>{' '}
                                        {eventoSeleccionado.hora}
                                    </p>

                                    <p>
                                        <strong>Consulta:</strong>{' '}
                                        {eventoSeleccionado.tipo}
                                    </p>

                                    <p>
                                        <strong>Correo:</strong>{' '}
                                        {eventoSeleccionado.correo}
                                    </p>
                                </>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}