import React, { Component, Fragment } from "react";
import queryString from 'query-string'
import _ from 'lodash';

import "./AppointmentList.scss";
import UserTypes from '../constants/userTypes.json';

const axios = require('axios').default;
var moment = require('moment');

export default class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    }
  }

  // Make a call to get all the appointments for the user.
  componentDidMount() {
    var params = { accessToken: this.props.user.accessToken };

    // TO DO: Should make a constants file for this.
    if (this.props.user.userType === UserTypes.student) params.studentId = this.props.user.personId;
    else params.workerId = this.props.user.personId;

    axios.get(`/api/appointments/?${queryString.stringify(params)}`)
      .then(res => {
        if (res.data !== "") {
          this.setState({
            appointments: res.data,
          });
          console.log('appointments', this.state.appointments);
        }
      })
  }

  render() {
    // Display a message to the user if they do not have any appointments.
    if (_.isEmpty(this.state.appointments)) return <h3>No Upcoming Appointments!</h3>

    // Render their appointments in tablular form.
    else {
      return (
        <div className="appointmentList">
          <h3>Upcoming Appointments: </h3>
          <ul>
            {
              this.state.appointments.map((appointment) => (
                <li className="appointment" id={appointment.appointmentId}>
                  <div className="first-row">
                    <div className="specific-date">{moment(appointment.date).format('dddd, MMM D, YYYY')}</div>
                    {/* Display either the student name or worker name depending on the specific user. */}
                    {this.props.user.userType === UserTypes.student?
                      <div className="person-name">{appointment.worker.firstName} {appointment.worker.lastName}</div>
                      :
                      <div className="person-name">{appointment.student.firstName} {appointment.student.lastName}</div>
                    }
                  </div>
                  <div className="times">{appointment.startTime.substring(0, 5)} to {appointment.endTime.substring(0, 5)}</div>
                </li>
              ))
            }
          </ul>
        </div>
      )
    }
  }
}
