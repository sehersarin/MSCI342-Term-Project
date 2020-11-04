import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./CreateAppointmentForm.scss"
// import dashboard from "./Layouts/Dashboard"
import { Link } from 'react-router-dom';

import queryString from 'query-string'

const axios = require('axios').default;

//This class is for students to sign up for appointments 
//students or support workers may access this page from the dashboard then fill in the following information 

class CreateAppointmentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        workerId: 8000000, // taken from Amy's test for the api
        schoolId: 1,       //will need to implement a page before this to pass these values through
        studentId: 0, // check with Melissa if already stored in props
        workerTimeslotId : 0, 
        purpose: "", // Max 300 => input size is 300
        successfulAppointment: false,
        formSubmission: false,
        availableTimes: []
      };
      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheckbox = event => {
    let name = event.target.name;
    this.setState({
      workerTimeslotId: name
    });
    console.log('name', name);
  };

  handleFormChange = event => {
    let val = event.target.value;
    let stateName = event.target.name;
    this.setState({
      stateName: val
    });
    console.log(stateName, val);
  };
  
  handleSubmit(e) {
      e.preventDefault();

      this.setState({
        formSubmission: true
      });

      let studentId = this.state.studentId;
      let workerTimeslotId = this.state.workerTimeslotId;
      let purpose = this.state.purpose;

      var params = {studentId: studentId, workerTimeslotId: workerTimeslotId, purpose: purpose}

      axios.get(`/api/book-appointment?${queryString.stringify(params)}`)
      .then(res => {
        console.log(res.data);
        let isSuccess = res.data;
        // if success
        this.setState({
          successfulAppointment: isSuccess
        });
      });
  }

  componentDidMount() {
    var params = {studentId: studentId, workerTimeslotId: workerTimeslotId, , ,accessToken: this.props.user.accessToken };

    // Passes in the appropriate parameter depending on the type of user.
    if (this.props.user.userType === UserTypes.student) params.studentId = this.props.user.personId;
    else params.workerId = this.props.user.personId;

    axios.get(`/api/worker-availability/?${queryString.stringify(params)}`)
      .then(res => {
        // Only stores the avalibilty data if no error occured and the data is not null.
        // Else, shows no avalibly booking times and logs the error.
        if (_.isNil(res.error) && !_.isNil(res.data)) {
          this.setState({
            availableTimes: res.data,
          });
        } else {
          console.log('Error occurred when retrieving the worker avalibility ', res.error);
        }
      });
  }
  //add an else if statement for successful form submissiom but unsuccessful appointment submission (api backend)
  //have the user redo the book appointment process
  render() {
    if (this.state.successfulAppointment && this.state.formSubmission)
      return (
        <div>
          Success!
        </div>
      );
    else
      return (
          <Container className="Form-container">
             <Title name= "Book Appointment. (Still needs to be implemented)"></Title>
            <Row>
             <Col sm={12} align="center">
             <div className="appointmentList">
          <h3>Avalible Time Slots: </h3>
          <ul>
            {
              this.state.availableTimes.map((Worker_Timeslot) => (
                <li className="appointment" id={appointment.appointmentId}>
                  <div className="first-row">
                    <div className="specific-date">{moment(appointment.date).format('dddd, MMM D, YYYY')}</div>
                    {/* Display either the student name or worker name depending on the specific user. */}
                    {this.props.user.userType === UserTypes.student ?
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


             <form onSubmit={this.handleSubmit}> 
                  <label>
                  <input type="checkbox" id="timeSlot" name="timeSlot" value="1" onChange={this.handleCheckbox}/>
                  </label>
                  <label>
                  <div>
                  2020-10-20, 08:00 - 08:30
                  </div> 
                  </label>

                  <label>
                  <input type="checkbox" id="timeSlot" name="timeSlot" value="2" onChange={this.handleCheckbox}/>
                  </label>
                  <label>
                  <div>
                  2020-10-20, 08:30 - 09:00
                  </div> 
                  </label>
                  <label>
                  <input type="checkbox" id="timeSlot" name="timeSlot" value="3" onChange={this.handleCheckbox}/>
                  </label>
                  <label>
                  <div>
                  2020-10-20, 09:00 - 09:30
                  </div> 
                  </label>

                  <br></br>
                  <br></br>
                  <label>
                  <input 
                        className ="InputFields" 
                        type="text" 
                        name="reason"
                        placeholder= "Reason for Booking Appointment" 
                        onChange={this.handleFormChange} />
                      </label>
                    <br></br>
                  <label>
                  <div>
                     (300 Character limit)
                  </div>
                  <br></br>
                  <input
                  className ="SubmitButton" 
                  type="submit" 
                  value="Submit!" />
                  </label>
              </form> 
              <br></br>
             <Link to="/successfulappointmentbooking" className="Signout">Continue to next page</Link>         
             </Col>
            </Row>
          </Container>
        );
  }

  /*
  componentDidMount() {
    <div>
      Success!
    </div>
    let workerId = this.state.workerId;
    let schoolId = this.state.workerId;

    var params = {workerId: workerId, schoolId: schoolId}

    axios.post(`/api/worker-availability?${queryString.stringify(params)}`)
    .then(res => {
    console.log(res.data);
    let availableTimeArray = res.data;
    this.setState({
      availableTime: availableTimeArray
    });
  });
}
*/
}
  
  export default CreateAppointmentForm;
  