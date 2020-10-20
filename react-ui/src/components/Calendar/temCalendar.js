import React, {useState} from 'react'
// got calendar from npm i react-single-calendar: https://www.npmjs.com/package/react-single-calendar
import SingleCalendar from 'react-single-calendar';
import "./temcalendar.css"

//just a tem calendar until someone builds a calendar

function temcalendar() {
    let [date, filterDate] = useState('');
    return (
        <div>
             <SingleCalendar selectedDate={filterDate} />
        </div>
    )
}

export default temcalendar