import React from 'react'

/* import temcalendar from '../../Calendar/temCalendar' */
import Check from './CheckboxApplication';
import AvailableMeetingHeader from './AvailableMeetingHeader';
 import TimeSlot from './TimeSlot'; 
 import Dropdown from 'react-bootstrap/Dropdown'


class WorkerInputpage extends React.Component {   

    render() {
        

        return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            

                <AvailableMeetingHeader/>
                <Check/>
                 <TimeSlot/>  
                {/* <temcalendar/> */}
            </div>
        )
    }
}

export default WorkerInputpage

