import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, Switch, Link, withRouter } from "react-router-dom";
import Title from "./Title"
import "./CreateAppointmentForm.scss"
// import dashboard from "./Layouts/Dashboard"

import queryString from 'query-string'
import CreateAppointment from "./Layouts/CreateAppointment"


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
        schoolId: 1,
        //schoolId: this.props.user.schoolId,  this doesn't seem to work
        studentId: this.props.user.personId, 
        accessToken: this.props.user.accessToken,
        formSubmission: false,
        WorkerIds: [],
      };
      this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange = event => {
    let val = event.target.value;
    let workerId = event.target.name;
    this.setState({
      workerId: val
    });
    console.log(workerId, val);
  };

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
       // } else {
         // console.log('Error occurred when mounting the WorkerList ', res.error);
       // }
      });
  }


  render() {
    //const { email, studentId, schoolId, userType, workerId, accessToken } = this.state;
    //let newRoute= <Route path="/Dashboard/SelectWorker" render={props => ( <Redirect to={`/dashboard/CreateAppointment/${email}/${userType}/${studentId}/${schoolId}/${workerId}/${accessToken}`} Component={CreateAppointment}/>)}></Route> 

    //if(this.state.submit){
     // return newRoute;
  //  }
      return (
          <Container className="Form-container">
             <Title name= "Select A Service Worker."></Title>
            <Row>
             <Col sm={12} align="center">
                  
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

                  <Link to = {`/dashboard/CreateAppointment/${this.state.email}/${this.state.userType}/${this.state.studentId}/${this.state.schoolId}/${this.state.workerId}/${this.state.accessToken}`}>
                  <input
                  className ="SubmitButton" 
                  type="submit" 
                  value="Submit!"/> 
                  </Link>

                
                <div>
                <main role="main">
                  <div className="main">
                    <Switch>
                      <Route path= {`/dashboard/CreateAppointment/`}>
                        <CreateAppointment workerId={this.state.workerId} />
                      </Route>
                    </Switch>
                  </div>
                </main>
                </div>

             <br></br>   
             </Col>
            </Row>
          </Container>
        );
  }
}
export default SelectWorkerForm ;
