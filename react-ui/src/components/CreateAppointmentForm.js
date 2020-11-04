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
    var params = {studentId: studentId, workerTimeslotId: workerTimeslotId, accessToken: this.props.user.accessToken };

    // Passes in the appropriate parameter.
    params.studentId = this.props.user.personId;
    
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
  //Taken from Melissa's code 
  //handleCheckbox = event => {
   // const a = event.target.value
   // const b= event.target.checked
   // let updatedAvail = Object.assign({}, this.state.timeslots, {[a]:b})
   // this.setState({
   //   timeslots : updatedAvail
   // });
  //};


  
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
    
    function tConvert (time) {
      // Check correct time format and split into components
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
     
      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join (''); // return adjusted time or original string
    }


    const listItems = this.state.availableTimes.map((el)=>
    <React.Fragment>
        <label> 
        <input type="checkbox" id={el.timeslotId} value ={el.timeslotId} onChange={this.handleCheckbox}/>
        {tConvert(el.startTime) + " to " + tConvert(el.endTime)}
      
        </label>
        <br></br>
      
    </React.Fragment>)

      return (
          <Container className="Form-container">
           
            <Row>
             <Col sm={12} align="center">
             <Title name= "Availability"></Title>
             <form onSubmit={this.handleSubmit}> 
                   {listItems}
                  <br></br>
                  <br></br>
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