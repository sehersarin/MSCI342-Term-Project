import React from 'react';
import { render } from 'react-dom';
import './CheckboxApplication.scss';
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter, Link, Router } from "react-router-dom";
import moment from 'moment'

class Check extends React.Component { // this is a class component for the checkbox feature of selecting recurring days
  constructor() {
    super();
    this.state = {
      Days: [
        { id: 1, value: "Monday" },
        { id: 2, value: "Tuesday" },
        { id: 3, value: "Wednesday" },
        { id: 4, value: "Thursday" },
        { id: 5, value: "Friday" },
        { id: 6, value: "Saturday" },
        { id: 7, value: "Sunday" }
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

  handleSubmit(event) { // submits selected days and assign recurrenting dates based off boxes checked
    const startDay = moment(document.getElementById("DATE").value)
    let AvailableDates = [];
    let currentDayNumber = moment(startDay).day();
    let DaySelected = false; // variable for if checkboxes are checked or not

    if (startDay.format("DD-MM-YYYY") === "Invalid date") {
      alert("No date has been selected, please selected a day")
      event.preventDefault();
    }
    else {
      for (let i = 1; i <= 7; i++) {
        let startofweek = moment(startDay).isoWeekday(0); // sets beginning of week to sunday
        if (this.state.checkedDays.get(String(i)) === true) {
          DaySelected = true;
          var AddDayCounter = i;

          if (AddDayCounter < currentDayNumber) {
            AddDayCounter = AddDayCounter + 7; // to ensure that users are not adding recurring schedule to days before the selected date
          }

          let StartingDay = startofweek.add(AddDayCounter, 'day');
          let NextWeek = "";

          for (let k = 0; k <= 4; k++) {
            AvailableDates.push(StartingDay.format("DD-MM-YYYY")); // adjust formatting if needed
            NextWeek = moment(StartingDay).add(7, "days");
            StartingDay = NextWeek;
          }
          console.log(AvailableDates);    // test line
        }
      }
      if (DaySelected === false) {
        alert("No day has been checked, please selected a day");
      }
      event.preventDefault();
    }
  }

  render() {

    return (
      <div>
        <form className={"Container"} onSubmit={this.handleSubmit}>
          <h1>Recurring on</h1>
          {
            this.state.Days.map(item => (
              <div className={"checkboxes"}>
                <label>
                  <input className="DayBox"
                    type="checkbox"
                    value={item.id}
                    onChange={this.handleChange}
                  /> {item.value}
                </label>
              </div>
            ))
          }
          <br />
          <input type="date" id="DATE" />
          <br />
          <input type="submit" value="Done" />
        </form>
      </div>
    );
  }
}
export default Check
render(<Check />, document.getElementById('root'));







