import React from "react";
import { render } from "react-dom";
import "./CheckboxApplication.scss";
import { Container, Row, Col } from "react-grid-system";
import Title from "../../Title"
import { Redirect, Route, withRouter, Link, Router } from "react-router-dom";
import moment from "moment";
import queryString from "query-string";
const axios = require("axios").default;

class Check extends React.Component {
  // this is a class component for the checkbox feature of selecting recurring days
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      isChecked: "",
      personId: this.props.personId,
      // personId : this.props.personId,
      items: [],
      startDay: moment(),
      accessToken: "",
      timeslots: "",
      Days: [
        { id: 1, value: "Monday" },
        { id: 2, value: "Tuesday" },
        { id: 3, value: "Wednesday" },
        { id: 4, value: "Thursday" },
        { id: 5, value: "Friday" },
        { id: 6, value: "Saturday" },
        { id: 7, value: "Sunday" },
      ],
      checkedDays: new Map(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    var params = { accessToken: "XcCa92ZvOnQKZsGtOKOa" };
    axios
      .get(`/api/possible-timeslots/?${queryString.stringify(params)}`)
      .then((res) => {
        if (res.data !== "") {
          this.setState({
            items: res.data,
          });
        }
      });
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2); 
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();     
      let currentDay = year + "-" + month + "-" + date;
      document.getElementById("DATE").value = currentDay;
  }

  handleCheckbox = (event) => {
    const a = event.target.value;
    const b = event.target.checked;
    let updatedAvail = Object.assign({}, this.state.timeslots, { [a]: b });
    this.setState({
      timeslots: updatedAvail,
    });
  };

  handleChange(event) {
    this.setState({
      startDay: moment(document.getElementById("DATE").value),
    });
    var isChecked = event.target.checked;
    var item = event.target.value;
    this.setState((prevState) => ({
      checkedDays: prevState.checkedDays.set(item, isChecked),
    }));
  }

  handleSubmit(event) {
    // submits selected days and assigns recurrenting dates based off boxes checked
    let AvailableDates = [];
   
    let currentDayNumber = moment(this.state.startDay).day();
    let DaySelected = false; // variable for if checkboxes are checked or not

    if (this.state.startDay.format("DD-MM-YYYY") === "Invalid date") {
      alert("No date has been selected, please selected a date");
      event.preventDefault();
    } else {
      var busySlots = {};
      // busySlots[0][this.state.personId][this.state.startDay.format("DD-MM-YYYY")]= this.state.timeslots
      busySlots[
        this.state.startDay.format("DD-MM-YYYY")
      ] = this.state.timeslots
      busySlots['personId'] = this.state.personId
      for (let i = 1; i <= 7; i++) {
        let startofweek = moment(this.state.startDay).isoWeekday(0); // sets beginning of week to sunday
        if (this.state.checkedDays.get(String(i)) === true) {
          DaySelected = true;
          var AddDayCounter = i;

          if (AddDayCounter < currentDayNumber) {
            AddDayCounter = AddDayCounter + 7; // to ensure that users are not adding recurring schedule to days before the selected date
          }

          let StartingDay = startofweek.add(AddDayCounter, "day");
          let NextWeek = "";

          for (let k = 1; k <= 5; k++) {
            // busySlots[k][this.state.personId][StartingDay.format("DD-MM-YYYY")]= this.state.timeslots
            busySlots[StartingDay.format("DD-MM-YYYY")] = this.state.timeslots
            busySlots['personId'] = this.state.personId
            NextWeek = moment(StartingDay).add(7, "days");
            StartingDay = NextWeek;
          }
        }
      }
      AvailableDates.push(busySlots);
      console.log(AvailableDates);
      if(this.state.timeslots ===""){
        alert("Please select timeslot(s)")
      }
      else{
        alert("Input is added")
      }
      // if (DaySelected === false) {
      //   alert("No day has been checked, please selected a day");
      // } else {
      //   alert("Days has been selected");
      // }
      event.preventDefault();
    }
  }

  render() {
    function tConvert(time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
    }

    const listItems = this.state.items.map((el) => (
      <React.Fragment>
        <div>
          <label>
            <input
              type="checkbox"
              id={el.slotId}
              value={el.slotId}
              onChange={this.handleCheckbox}
            />
            {tConvert(el.startTime) + " to " + tConvert(el.endTime)}
          </label>
          <br></br>
        </div>
      </React.Fragment>
    ));

    return (
      <Container className="Form-container">
        <Title name="Availability"/><Title/>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={8} align="center">
              <input type="date" id="DATE" onChange={this.handleChange} />
              <br />
              <br />
              {listItems}
              <br></br>
              <br></br>
              <label></label>
            </Col>
            <Col xs={4} debug>
              <p>Recurring on:</p>
              {this.state.Days.map((item) => (
                <div>
                  <label>
                    <input
                      className="DayBox"
                      type="checkbox"
                      value={item.id}
                      onChange={this.handleChange}
                    />{" "}
                    {item.value}
                  </label>
                </div>
              ))}
              <br />
              <br></br>
            </Col>
          </Row>
          <div align="center">
            <label>
              <br></br>
              <input
                className="SubmitButton"
                type="submit"
                value="Add Availability"
              />
            </label>
            <br></br>
            <br></br>
            {/* <input type="submit" value="Done" /> */}
            <Link to="/Dashboard" className="Signout">
              Back to Homepage
            </Link>
          </div>
        </form>
      </Container>
    );
  }
}
/* render(<Check />, document.getElementById('root')); */
export default Check;
