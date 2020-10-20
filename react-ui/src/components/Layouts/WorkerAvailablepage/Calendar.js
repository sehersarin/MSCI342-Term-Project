import React from 'react'
// got calendar from npm i react-single-calendar: https://www.npmjs.com/package/react-single-calendar
// This will be a templatory calendar
import SingleCalendar from 'react-single-calendar';
import './Calendar.css'


function Calendar() {
    let [date, filterDate] = React.useState('');
    return (
        <div>
              <label className = "Date">Date selected is {date}</label>  
             <SingleCalendar selectedDate={filterDate} />
        </div>
    )
}




export default Calendar

 




