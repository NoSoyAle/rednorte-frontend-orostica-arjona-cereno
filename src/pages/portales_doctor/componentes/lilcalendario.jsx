import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import * as bootstrap from 'bootstrap';

export default function CalendarioSemanal({ citas = [] }) {

    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

    const eventos = citas.map(cita => ({
        id: cita.id,

        title: `Paciente ${cita.pacienteId}`,

        start: `${cita.fecha}T${cita.horaInicio}`,

        end: `${cita.fecha}T${cita.horaFin}`,

        extendedProps: {
            estado: cita.estado,
            pacienteId: cita.pacienteId
        }
    }));

    function manejarEventoClick(info) {

        setEventoSeleccionado({
            paciente: info.event.extendedProps.pacienteId,
            estado: info.event.extendedProps.estado,
            hora: info.event.start.toLocaleTimeString('es-CL', {
                hour: '2-digit',
                minute: '2-digit'
            })
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
                    plugins={[
                        timeGridPlugin,
                        interactionPlugin
                    ]}
                    initialView="timeGridWeek"
                    locale={esLocale}
                    height="700px"
                    events={eventos}
                    eventClick={manejarEventoClick}
                    allDaySlot={false}
                    slotMinTime="06:00:00"
                    slotMaxTime="21:00:00"
                    slotDuration="00:15:00"
                    nowIndicator={true}
                    expandRows={true}
                />

            </div>

            <div
                className="modal fade"
                id="modalEvento"
                tabIndex="-1"
                aria-hidden="true"
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
                                aria-label="Cerrar"
                            ></button>

                        </div>

                        <div className="modal-body">

                            {eventoSeleccionado && (
                                <>
                                    <p>
                                        <strong>Paciente ID:</strong>{' '}
                                        {eventoSeleccionado.paciente}
                                    </p>

                                    <p>
                                        <strong>Estado:</strong>{' '}
                                        {eventoSeleccionado.estado}
                                    </p>

                                    <p>
                                        <strong>Hora:</strong>{' '}
                                        {eventoSeleccionado.hora}
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