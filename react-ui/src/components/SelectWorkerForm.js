import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./CreateAppointmentForm.scss"
// import dashboard from "./Layouts/Dashboard"
import { Link } from 'react-router-dom';

import queryString from 'query-string'
import CreateAppointment from "./Layouts/CreateAppointment"
const axios = require('axios').default;

//This class is for students to sign up for appointments 
//students or support workers may access this page from the dashboard then fill in the following information 

class SelectWorkerForm extends Component {
    constructor(props) {
      super(props);
     // email = this.props.email
      this.state = {
        submit:false,
        email: this.props.user.email,
        userType: this.props.user.userType,
        workerId: "Not_Changed!!", // taken from Amy's test for the api
        schoolId: 1,
        //schoolId: this.props.user.schoolId,  this doesn't seem to work
        studentId: this.props.user.personId, 
        accessToken: this.props.user.accessToken,
        formSubmission: false,
        WorkerIds: [],
      };
      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange = event => {
    let val = event.target.value;
    let workerId = event.target.name;
    //this.state.workerId = val
    this.setState({
      workerId: val
    });
    console.log(workerId, val);
  };

  handleSubmit(e) {
    this.setState({
      submit: true
    });
  }

  componentDidMount() {
    var params = { schoolId: this.state.schoolId, accessToken: this.state.accessToken };

    axios.get(`/api/get-workers-for-school/?${queryString.stringify(params)}`)
      .then(res => {
        // Only stores the worker data if no error occured and the data is not null.
        // Else, shows no workers and logs the error.
        //if (_.isNil(res.error) && !_.isNil(res.data)) {
          console.log(res.data);
          this.setState({
            WorkerIds: res.data,
          });
        //} else {
          //console.log('Error occurred when mounting the AppointmentList ', res.error);
        //}
      });
  }


  render() {
    const { email, studentId, schoolId, userType, workerId, accessToken } = this.state;
    let newRoute= <Route path="/Dashboard/SelectWorker" render={props => ( <Redirect to={`/dashboard/CreateAppointment/${email}/${userType}/${studentId}/${schoolId}/${workerId}/${accessToken}`} Component={CreateAppointment}/>)}></Route> 

    if(this.state.submit){
      return newRoute;
    }
      return (
          <Container className="Form-container">
             <Title name= "Select A Service Worker."></Title>
            <Row>
             <Col sm={12} align="center">
                <form onSubmit={this.handleSubmit}>
                
                  <input 
                  type="radio" 
                  value="800000" 
                  name="choice"
                  onChange= {this.handleFormChange}/> Worker 1
                  <br></br>

                  <input 
                  type="radio" 
                  value="800001"
                  name="choice" 
                  onChange= {this.handleFormChange}/> Worker 2
                  <br></br>

                  <input 
                  type="radio" 
                  value="800002" 
                  name="choice"
                  onChange= {this.handleFormChange}/> Worker 3
                  <br></br>
                  <br></br>

                  <input
                  className ="SubmitButton" 
                  type="submit" 
                  value="Submit!"/> 

                </form>
             <br></br>   
             </Col>
            </Row>
          </Container>
        );
  }
}
export default SelectWorkerForm ;
