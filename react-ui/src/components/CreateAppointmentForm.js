import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./CreateAppointmentForm.scss"
//import dashboard from "./Layouts/Dashboard"
import { Link } from 'react-router-dom';

import queryString from 'query-string'

const axios = require('axios').default;
var moment = require('moment');
var date = new Date();
var eDate = new Date(Date.now() + 14*24*60*60*1000);

//This class is for students to sign up for appointments 
//students or support workers may access this page from the dashboard then fill in the following information 

class CreateAppointmentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        workerId: window.location.href.slice(50,56), //possible look into referencing by character not index placement
        schoolId: 1 ,   
        studentId: this.props.user.personId, 
        workerTimeslotId : 0, 
        purpose: "", // Max 300 => input size is 300
        successfulAppointment: false,
        formSubmission: false,
        availableTime : [],
        startDate: moment(date).format('YYYY-MM-DD'), // start date
        endDate: moment(eDate).format('YYYY-MM-DD') //start date + 14 days
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
  //add an else if statement for successful form submissiom but unsuccessful appointment submission (api backend)
  //have the user redo the book appointment process
  render() {
    console.log(this.state.startDate, this.state.endDate);
      return (
          <Container className="Form-container">
             <Title name= "Book Appointment. (Still needs to be implemented)"></Title>
            <Row>
             <Col sm={12} align="center">
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
              <div>

              <Link to="/dashboard">Home</Link>

              </div>
              </Col>
            </Row>
          </Container>
        );
  }

}
  
  export default CreateAppointmentForm;
  