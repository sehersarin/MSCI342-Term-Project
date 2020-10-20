import React from 'react'

/* import temcalendar from '../../Calendar/temCalendar' */
import Check from './CheckboxApplication';
import AvailableMeetingHeader from './AvailableMeetingHeader';
 import TimeSlot from './TimeSlot'; 
import DropDown from './DropDown';
 
const items = [
    {id:1, value: "Value1"},
    {id:2, value: "Value2"}
]


class WorkerInputpage extends React.Component {   



    render() {
        

        return (
            <div>
                <DropDown title = "Select stuff" items = {items}/>
                <AvailableMeetingHeader/>
                <Check/>
                 <TimeSlot/>  
                {/* <temcalendar/> */}
            </div>
        )
    }
}

export default WorkerInputpage

