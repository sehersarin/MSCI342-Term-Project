import React from 'react'


import Check from './CheckboxApplication';
import AvailableMeetingHeader from './AvailableMeetingHeader';
 import TimeSlot from './TimeSlot'; 
 import './WorkerInputpage.css'



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
                 
            </div>
        )
    }
}

export default WorkerInputpage

