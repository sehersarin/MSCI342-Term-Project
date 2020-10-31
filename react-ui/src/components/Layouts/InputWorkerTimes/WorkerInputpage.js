import React from 'react'
import Check from './CheckboxApplication';
import AvailableMeetingHeader from './AvailableMeetingHeader';
 import TimeSlot from './TimeSlot'; 
import './WorkerInputpage.css';
 import { Link } from 'react-router-dom';
 import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import moment from 'moment';





class WorkerInputpage extends React.Component {    // this class component would be putting together other components into one page

    render() {
        const weeksAway = moment().add(1, 'month').calendar()

        return (
            <div>
                <AvailableMeetingHeader/>
                <Check/>
                 {/* <TimeSlot/> */}
        <h1>Date Range is :{moment().format("MMM Do YYYY")} to {moment(weeksAway).format("MMM Do YYYY")}</h1>

                <Container className = "wraper">
                    <label for ="school" className = "SelectSchoolsLabel" > Select School:</label>
                    <select name="school" className ="SelectSchools"  id="school">   
                    <option value="School1">School 1</option>
                    <option value="School2">School 2</option>
                    <option value="School3">School 3</option> 
                    </select>
                </Container> 
            
            </div>
        )
        
    }
}

export default WorkerInputpage
/* 
const rootElement = document.getElementById("root");
ReactDOM.render(<WorkerInputpage />, rootElement); */

