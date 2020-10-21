import React  from 'react';
import { render } from 'react-dom';
import './TimeSlot.css'; 
import moment from 'moment';


/* import {Container, Row, Col} from 'react-grid-system'; */

class TimeSlot extends React.Component { // this is a class component for the checkbox feature of selecting recurring days
  constructor() {
    super();
    this.state = {
      Times: [
        {id: 1, value: "9:00", endtime:"9:30"},
        {id: 2, value: "9:30",endtime:"10:00"},
        {id: 3, value: "10:00",endtime:"10:30"},
        {id: 4, value: "10:30",endtime:"11:00"},
        {id: 5, value: "11:00",endtime: "11:30"},
        {id: 6, value: "11:30",endtime: "12:00"},
        {id: 7, value: "12:00",endtime: "12:30"},
        {id: 8, value: "12:30",endtime: "12:30"},
        {id: 9, value: "13:00",endtime: "13:30"},
        {id: 10, value: "13:30",endtime: "14:00"},
        {id: 11, value: "14:00",endtime: "14:30"},
        {id: 12, value: "14:30",endtime: "15:00"},
        {id: 13, value: "15:00",endtime: "15:30"},
        {id: 14, value: "15:30",endtime: "16:00"},
        {id: 15, value: "16:00",endtime: "16:30"},
        {id: 16, value: "16:30",endtime: "17:00"},
        {id: 17, value: "17:00",endtime: "17:30"},
      ],
      checkedTimes: new Map(),

    }
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event) {
        var isChecked = event.target.checked;
        var item = event.target.value;
         
        this.setState(prevState => ({ checkedTimes: prevState.checkedTimes.set(item, isChecked) }));
  }
     
  handleSubmit(event) {
    console.log("this button works"); // edit this for future functions
    event.preventDefault();
  }


  render() {

    return (
      <div className = 'Wrapper'>
      
        <form onSubmit={this.handleSubmit}>
           
          {
            this.state.Times.map(item => (
              <div >
                <label className = "CheckBox">
                {item.value}
                  <input className = "Box"
                  value={item.id}
                    type="checkbox"
                    onChange={this.handleChange}
                  /> 
                  <span className="checkmark"></span>
                </label>
              </div>
            ))
          }
           
          <br/>
          <input type="submit" value="Add Availability" />
        </form>
      </div>
    );
  }
}
   export default TimeSlot
render(<TimeSlot />, document.getElementById('root'));