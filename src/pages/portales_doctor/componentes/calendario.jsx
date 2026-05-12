import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function Results() {
    const [calDate, setCalDate] = useState(new Date())

    function onChange (calDate) {
        setCalDate(calDate)
           const filteredResults = userResults.filter(result => {
        const newResultFormat = new Date(result.created_at).toLocaleString().split(",")[0]
        const newCalDateFormat = calDate.toLocaleString().split(",")[0]
        return newResultFormat === newCalDateFormat
    })

    return (
        <div className="result-calendar">
            <Calendar onChange={onChange} value={calDate} />
        </div>
    )}
}