import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export default function CalendarioGrande({ eventos }) {

    return (
        <div
            className="bg-white p-4 rounded-4 mt-3 shadow-lg mx-auto"
            style={{
                width: '95%',
                maxWidth: '1100px',
                backgroundColor: '#f8fafc'
            }}
        >
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={esLocale}
                height="750px"
                events={eventos}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                }}
            />
        </div>
    );
}