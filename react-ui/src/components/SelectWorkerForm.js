import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, Switch, Link, withRouter } from "react-router-dom";
import Title from "./Title"
import "./SelectWorkerForm.scss"
// import dashboard from "./Layouts/Dashboard"

import queryString from 'query-string'
import CreateAppointment from "./Layouts/CreateAppointment"
import _ from 'lodash'


const axios = require('axios').default;
var moment = require('moment');

//This class is for students to choose a worker to sign up for appointments with

class SelectWorkerForm extends Component {
    constructor(props) {
      super(props);
     // email = this.props.email
      this.state = {
        submit:false,
        email: this.props.user.email,
        userType: this.props.user.userType,
        workerId: "Not_Changed!!", // check to see if changed in the URL in the next page
        schoolId: this.props.user.schoolId,  
        studentId: this.props.user.personId, 
        accessToken: this.props.user.accessToken,
        formSubmission: false,
        formSelection: false,
        WorkerIds: [],
      };
      this.handleFormChange = this.handleFormChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFormChange = event => {
    let val = event.target.value;
    let workerId = event.target.name;
    this.setState({
      workerId: val,
      formSelection: true
    });
    console.log(workerId, val);
  };

  handleSubmit(event) {
    if(this.state.formSelection === false){
      alert("Please Select a Worker");
      event.preventDefault();
    }
    else{
    this.setState({
      formSubmission: true
    });
    }
  }


  componentDidMount() {
    var params = { schoolId: this.state.schoolId, accessToken: this.state.accessToken };

    axios.post(`/api/get-workers-for-school/?${queryString.stringify(params)}`)
      .then(res => {
        // Only stores the worker data if no error occured and the data is not null.
        // Else, shows no workers and logs the error.
        if (_.isNil(res.error) && !_.isNil(res.data)) {
          console.log(res.data);
          this.setState({
            WorkerIds: res.data,
          });
        } else {
          console.log('Error occurred when mounting the WorkerList for school ', res.error);
        }
      });
  }


  render() {
    const { email, studentId, schoolId, userType, workerId, accessToken } = this.state;
    console.log("this props", this.props);
    //DO NOT CHANGE THE ORDER OF THIS ROUTE
    //the next page reads in information from the URL
    let newRoute= <Route path="/Dashboard/SelectWorker" render={props => ( <Redirect to={`/dashboard/CreateAppointment/${workerId}/${email}/${userType}/${studentId}/${schoolId}/${accessToken}`} Component={CreateAppointment}/>)}></Route> 
    if(this.state.WorkerIds == ""){
      return(
        <Container className="WorkerSelectForm-container">
             <Title name= "Sorry, no service workers for your school were found"></Title>
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
    if(this.state.formSubmission){
        return newRoute;
    }
    else{
      return(

          <Container className="WorkerSelectForm-container">
             <Title name= "Select A Service Worker"></Title>
            <Row>
             <Col sm={12} align="center">
                  {this.state.WorkerIds.map((item) => (
                  <div className= "workerTile">
                      <label className="worker-name">
                        <div>
                        <input className="SelectionButton"
                          name="choice"
                          type="radio"
                          value={item.workerId}
                          onChange={this.handleFormChange}
                        />{" "}
                        {item.firstName} {item.lastName}</div>
                        <br></br>
                        <div className="type">{item.type}</div>
                        <div className="specialization">{item.specialization}</div>
                      </label>
                    </div>
                  ))}

                  <form onSubmit={this.handleSubmit}> 
                  <input
                  className ="SubmitWorkerButton" 
                  type="submit" 
                  value="Next"/> 
                </form>
             <br></br>   
             </Col>
            </Row>
          </Container>
        );
  }}
}
}
export default SelectWorkerForm ;
