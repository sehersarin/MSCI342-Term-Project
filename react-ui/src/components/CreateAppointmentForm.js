import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./CreateAppointmentForm.scss"
//import dashboard from "./Layouts/Dashboard"
import { Link } from 'react-router-dom';

import queryString from 'query-string'
import Home from "./Layouts/Home";
import _ from 'lodash'


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
        workerId: window.location.href.slice(50,57), //possible look into referencing by character not index placement
        schoolId: "1" ,   
        studentId: this.props.user.personId, 
        accessToken: this.props.user.accessToken,
        workerTimeslotId: 0, 
        purpose: "", // Max 300 => input size is 300
        successfulAppointment: false,
        timeSelection: false,
        reasonSelection: false,
        formSubmission: false,
        availableTimes: [],
        startDate: String(moment(date).format('YYYY-MM-DD')), // start date
        endDate: String(moment(eDate).format('YYYY-MM-DD')) //start date + 14 days
      };
      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleReasonChange = this.handleReasonChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleFormChange = event => {
    let val = event.target.value;
    let workerTimeslotId = event.target.name;
    this.setState({
      workerTimeslotId: val,
      timeSelection: true
    });
    console.log(workerTimeslotId, val);
  };

  handleReasonChange = event => {
    let val = event.target.value;
    let purpose = event.target.name;
    this.setState({
      purpose: val,
      reasonSelection: true

    });
    console.log(purpose, val);
  };
  
  handleSubmit(event) {
     
    if(this.state.timeSelection === false){
      alert("Please Select a Timeslot");
      event.preventDefault();
    }
    else if(this.state.reasonSelection === false){
      alert("Please Specify Your Reason");
      event.preventDefault();
    }
    else{
      event.preventDefault();

      this.setState({
        formSubmission: true
      });

      let studentId = this.state.studentId;
      let workerTimeslotId = this.state.workerTimeslotId;
      let purpose = this.state.purpose;

      var params = {studentId: studentId, workerTimeslotId: workerTimeslotId, purpose: String(purpose), accessToken: this.state.accessToken}

      axios.post(`/api/book-appointment?${queryString.stringify(params)}`)
      .then(res => {
        console.log(res.data);
        let isSuccess = res.data;
        // if success
        this.setState({
          successfulAppointment: isSuccess
        });
      });
  }}

  componentDidMount() {
    console.log(this.state.workerId);
    var params = { workerId: this.state.workerId, schoolId: this.state.schoolId, startTime: this.state.startDate, endTime: this.state.endDate, accessToken: this.state.accessToken };
    axios.post(`/api/worker-availability/?${queryString.stringify(params)}`)
      .then(res => {
        // Only stores the worker data if no error occured and the data is not null.
        // Else, shows no workers and logs the error.
        if (_.isNil(res.error) && !_.isNil(res.data)) {
          console.log(res.data);
          this.setState({
            availableTimes: res.data,
          });
       } else {
          console.log('Error occurred when mounting the WorkerList ', res.error);
        }
      });
  }
  
  render() {
    //if no avalible times were found
    if(this.state.availableTimes === ""){
      return(
        <Container className="Form-container">
             <Title name= "There are no avalible times for this worker, sorry"></Title>
            <Row>
             <Col sm={12} align="center">
                  
              <br></br>
              <div>

              <Link to="/dashboard">Home</Link>

              </div>
              </Col>
            </Row>
          </Container>
      );
    } 
    else{
    //if form was submitted but the appointment was not saved successfully
    if(this.state.formSubmission === true && this.state.successfulAppointment === true){
      return(
        <Container className="Form-container">
             <Title name= "Successful Appointment Booking!"></Title>
            <Row>
             <Col sm={12} align="center">
                  
              <br></br>
              <div>

              <Link to="/dashboard">Home</Link>

              </div>
              </Col>
            </Row>
          </Container>
      );
    }
    //if the for was submitted and the appointment was saved successfully
    else if (this.state.formSubmission === true && this.state.successfulAppointment === false){
      return(
      <Container className="Form-container">
             <Title name= "Appointment Booking Failed, Please Try Again"></Title>
            <Row>
             <Col sm={12} align="center">
                  
              <br></br>
              <div>

              <Link to="/dashboard">Home</Link>

              </div>
              </Col>
            </Row>
          </Container>
           );
    }
    //else return the form to be filled out
    else{ 
      return (
          <Container className="Form-container">
             <Title name= "Book Appointment"></Title>
            <Row>
             <Col sm={12} align="center">
                  {this.state.availableTimes.map((item) => (
                        <div>
                            <label>
                              <input
                                name="choice"
                                type="radio"
                                value={item.workerTimeslotId}
                                onChange={this.handleFormChange}
                              />{" "}
                               {moment(item.date).format('dddd, MMM D, YYYY')} <br></br>
                              {item.startTime.substring(0, 5)} to {item.endTime.substring(0, 5)}<br></br>
                              <br></br>    
                            </label>
                          </div>
                        ))}
                  <br></br>
                  <label>
                  <input 
                        className ="InputReason" 
                        type="text" 
                        name="reason"
                        placeholder= "Reason for Booking Appointment" 
                        onChange={this.handleReasonChange} />
                      </label>
                    <br></br>
                  <label>
                  <div>
                     (300 Character limit)
                  </div>
                  <br></br>
                  </label>
              <form onSubmit={this.handleSubmit}> 
                  <input
                  className ="SubmitAppButton" 
                  type="submit" 
                  value="Submit!" />
                 
              </form> 
              <br></br>
              </Col>
            </Row>
          </Container>
        );
  }
}
}
}
  
  export default CreateAppointmentForm;
  