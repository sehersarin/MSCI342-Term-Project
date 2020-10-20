import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./CreateAppointmentForm.css"
import dashboard from "./Layouts/Dashboard"
import { Link } from 'react-router-dom';

import queryString from 'query-string'

const axios = require('axios').default;

//This class is for students to sign up for appointments 
//students or support workers may access this page from the dashboard then fill in the following information 

class CreateAppointmentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        studentId: 0, // check with Melissa if already stored in props
        workerTimeslotId : 0, 
        purpose: "", // Max 300 => input size is 300
        successfulAppointment: false,
        formSubmission: false,
        availableTime : []
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
             <form onSubmit={this.handleSubmit}>
                  <label>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" onChange={this.handleCheckbox}/>
                  </label>
             
                  <label>
                  <input 
                    className ="InputFields" 
                    type="text" 
                    name="date" //worker time slot id
                    size ="40"
                    placeholder= "Select a Date" 
                    onChange={this.handleFormChange} /> 
                  </label>
                  <br></br>
                  <label>
                  <input 
                    className ="InputFields" 
                    type="text" 
                    name="time_slot"
                    size ="40"
                    placeholder= "Select a Time" 
                    onChange={this.handleFormChange} />
                  </label>
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
  }
  
  export default CreateAppointmentForm;
  