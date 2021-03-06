import React, { Component } from "react";
import queryString from 'query-string'
import _ from 'lodash';
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';
import "./AppointmentList.scss";

import UserTypes from '../../constants/userTypes.json';

const axios = require('axios').default;
var moment = require('moment');

export default class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    }

    // Binds methods to prevent issues with 'this' keyword.
    this.cancelAppointment = this.cancelAppointment.bind(this);
  }

  // Make a call to get all the appointments for the user.
  componentDidMount() {
    var params = { accessToken: this.props.user.accessToken };

    // Passes in the appropriate parameter depending on the type of user.
    if (this.props.user.userType === UserTypes.student) params.studentId = this.props.user.personId;
    else params.workerId = this.props.user.personId;

    axios.get(`/api/appointments/?${queryString.stringify(params)}`)
      .then(res => {
        // Only stores the appointment data if no error occured and the data is not null.
        // Else, shows no upcoming appointments and logs the error.
        if (_.isNil(res.error) && !_.isNil(res.data)) {
          this.setState({
            appointments: res.data,
          });
        } else {
          console.log('Error occurred when mounting the AppointmentList ', res.error);
        }
      });
  }

  cancelAppointment(event) {
    // Stores the required parameters in an object to be passed to the api.
    const params = {
      accessToken: this.props.user.accessToken,
      appointmentId: event.target.id
    };

    // Customizes the content in the cancel appointment popup.
    const options = {
      title: 'Appointment Cancellation Confirmation',
      message: 'Are you sure you want to cancel this appointment?',
      buttons: [
        {
          label: 'Yes',
          className: "yes-cancel-btn",
          onClick: () => {
            // Calls the api to cancel the appointment which returns true if the appointment was successfully cancelled and false otherwise. 
            axios.get(`/api/cancel-specific-appointment/?${queryString.stringify(params)}`)
              .then(res => {
                // Display a success message if the appointment is successfully cancelled without any errors.
                if (_.isNil(res.error) && res.data) {
                  alert('The appointment has been cancelled!');
                } else { // Else, let's the user know that the appointment was not cancelled successfully.
                  alert('The appointment was NOT cancelled. Please try again.');
                  console.log('Error occurred when calling the cancel appointment api: ', res.error);
                }
              });
          }
        },
        {
          label: 'No',
          className: "no-cancel-btn",
          // Does not cancel the appointment and automatically closes the popup.
          // Does not display an alert to the user to prevent unnecessary clicking.
          // If desired in the future, uncomment following code of line. 

          // onClick: () => alert('The appointment is NOT cancelled.')
        }
      ]
    };

    // Calls the popup to check if the user actually wanted to cancel the meeting.
    confirmAlert(options);
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
                    {this.props.user.userType === UserTypes.student ?
                      <div className="person-name">{appointment.worker.firstName} {appointment.worker.lastName}</div>
                      :
                      <div className="person-name">{appointment.student.firstName} {appointment.student.lastName}</div>
                    }
                    <button className="cancel-btn" onClick={this.cancelAppointment} id={appointment.appointmentId}>Cancel</button>
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
