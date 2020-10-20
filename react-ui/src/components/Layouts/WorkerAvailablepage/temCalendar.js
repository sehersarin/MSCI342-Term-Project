import React from 'react'
import ReactDOM from 'react-dom'

// got calendar from npm i react-single-calendar: https://www.npmjs.com/package/react-single-calendar
//install with npm i react-single-calendar
import SingleCalendar from 'react-single-calendar';
import "./temCalendar.css"

//just a tem calendar until someone builds a calendar

// do not use, doesn't work



class temCalendar extends React.Component {
    
    render() {
        let [date, filterDate] = React.useState('');
        return (
            <div>
                <h1>{date}</h1>
                <SingleCalendar selectedDate={filterDate} />
            </div>
        )
    }
}



export default temCalendar;




