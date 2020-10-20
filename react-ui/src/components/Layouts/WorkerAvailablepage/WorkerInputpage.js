import React from 'react'
import Check from './CheckboxApplication';
import AvailableMeetingHeader from './AvailableMeetingHeader';
 import TimeSlot from './TimeSlot'; 
 import './WorkerInputpage.css'
 import { Link } from 'react-router-dom';
 import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";




class WorkerInputpage extends React.Component {   

    render() {

        return (
            <div>

                <AvailableMeetingHeader/>
                <Check/>
                 <TimeSlot/> 
                 

                 <select name="role" className ="InputFields" id="type">
                  <option value="student">School 1</option>
                  <option value="worker1">School 2</option>
                  <option value="worker2">School 3</option> 
                </select>
                 
                <br></br>
            
            </div>
        )
    }
}

export default WorkerInputpage

