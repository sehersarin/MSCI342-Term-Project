import React from 'react'

/* import temcalendar from '../../Calendar/temCalendar' */
import Check from './CheckboxApplication';
import AvailableMeetingHeader from './AvailableMeetingHeader';
 import TimeSlot from './TimeSlot'; 
 import './WorkerInputpage.css'

 

class WorkerInputpage extends React.Component {   



    render() {
        

        return (
            <div>
                {/* <DropDown title = "Select stuff" items = {items}/> */}
                <AvailableMeetingHeader/>
                <Check/>
                 <TimeSlot/> 


                 <select name="role" className ="InputFields" id="type">
                  <option value="student">School 1</option>
                  <option value="worker1">School 2</option>
                  <option value="worker2">School 3</option> 
                </select>
                {/* <temcalendar/> */}
            </div>
        )
    }
}

export default WorkerInputpage

