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

class SelectWorkerForm extends Component {
    constructor(props) {
      super(props);
     // email = this.props.email
      this.state = {
        email: this.props.email,
        workerId: "", // taken from Amy's test for the api
        schoolId: 1,       //will need to implement a page before this to pass these values through
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
  }
  //add an else if statement for successful form submissiom but unsuccessful appointment submission (api backend)
  //have the user redo the book appointment process
  render() {
    console.log(this.state.email);
      return (
          <Container className="Form-container">
             <Title name= "Select A Service Worker. (Still needs to be implemented)"></Title>
            <Row>
             <Col sm={12} align="center">
             <form onSubmit={this.handleSubmit}> 
                  <label>
                  <input type="checkbox" id="workerID" name="workerID" value="1" onChange={this.handleCheckbox}/>
                  </label>
                  <label>
                  <div>
                  Worker 1
                  </div> 
                  </label>

                  <label>
                  <input type="checkbox" id="workerID" name="workerID" value="2" onChange={this.handleCheckbox}/>
                  </label>
                  <label>
                  <div>
                  Worker 2
                  </div> 
                  </label>
                  <label>
                  <input type="checkbox" id="workerID" name="workerID" value="3" onChange={this.handleCheckbox}/>
                  </label>
                  <label>
                  <div>
                  Worker 3
                  </div> 
                  </label>
                  <br></br>
                  <br></br>
                  <label>
                  <input
                  className ="SubmitButton" 
                  type="submit" 
                  value="Submit!" />
                  </label>
              </form> 
              <br></br>
              <Link to={`/dashboard/CreateAppointment/`}>Create Appointment</Link>       
             </Col>
            </Row>
          </Container>
        );
  }
}
  export default SelectWorkerForm ;