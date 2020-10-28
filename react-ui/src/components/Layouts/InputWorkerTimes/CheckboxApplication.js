import React  from 'react';
import { render } from 'react-dom';
import './CheckboxApplication.css';
import {Container, Row, Col} from 'react-grid-system';
       
class Check extends React.Component { // this is a class component for the checkbox feature of selecting recurring days
  constructor() {
    super();
    this.state = {
      Days: [
        {id: 1, value: "Monday"},
        {id: 2, value: "Tuesday"},
        {id: 3, value: "Wednesday"},
        {id: 4, value: "Thursday"},
        {id: 5, value: "Friday"},
        {id: 6, value: "Saturday"},
        {id: 7, value: "Sunday"}
      ],
      checkedDays: new Map()
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event) {
        var isChecked = event.target.checked;
        var item = event.target.value;
         
        this.setState(prevState => ({ checkedDays: prevState.checkedDays.set(item, isChecked) }));
  }
     
  handleSubmit(event) {
    console.log(this.state); // edit this for future functions
    event.preventDefault();
  }
     
  render() {
    return (
      <div>
          
        <form className = {"Container"} onSubmit={this.handleSubmit}>
        <h1>Recurring on</h1>
          { 
            this.state.Days.map(item => (
              <div className = {"checkboxes"}>
                <label>
                  <input className = "DayBox"
                    type="checkbox"
                    value={item.id}
                    onChange={this.handleChange}
                  /> {item.value}
                </label>
              </div>
            ))
          }
           
          <br/>
          <input type="submit" value="Done" />
        </form>
      </div>
    );
  }
}
   export default Check
render(<Check />, document.getElementById('root'));







