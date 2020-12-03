import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./SignupForm.scss"
// import dashboard from "./Layouts/Dashboard"
import Dashboard from "./Dashboard/Dashboard"
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import _ from 'lodash';


const axios = require('axios').default;

//This class is used to create a Sign-up component where users enter their name, email, role, type and password to create an account.
//If they have previously made an account they can click on "I already have an account" and be redirected to the sign-in page.
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName:"",
        lastName:"",
        userType:"",
        workerType:"",
        optionalType:"",
        specialization:"",
        optionalSpecialization:"",
        personId:"",
        email: "",
        phone:"",
        password: "",
        accessToken: "",
        isSubmitted: false,
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
}

handleFormChange = event => {
  let val = event.target.value;
  let stateName = event.target.name;
  this.setState({
    stateName: val
  });
  console.log(stateName, val);
};

signup = event => {
  let firstName = this.state.firstName;
  let lastName = this.state.lastName;
  let userType = this.state.userType;
  let workerType = this.state.workerType;
  let optionalType = this.state.optionalType;
  let specialization = this.state.specialization;
  let optionalSpecialization = this.state.optionalSpecialization;
  let personId = this.state.personId;
  let email = this.state.email;
  let phone = this.state.phone;
  let password = this.state.password;
  
  var params = { 
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    userType: this.state.userType,
    type: this.state.workerType || this.state.optionalType,
    specialization: this.state.specialization || this.state.optionalSpecialization,
    workerId: this.state.personId,
    studentId: this.state.personId,
    // personId = this.state.personId,
    email: this.state.email,
    phone: this.state.phone,
    password: this.state.password,
    /* studentId: Joi.number().positive().integer(),
    workerId: Joi.number().positive().integer(),
    schoolId: Joi.number().positive().integer(),
    */
  }

  axios.get(`/public/create-user/?${queryString.stringify(params)}`)

  .then(res => {
    console.log(res.data)
   if (_.isNil(res.error) && res.data) {
      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        userType: res.data.userType,
        type: res.data.workerType || res.data.optionalType,
        specialization: res.data.specialization || res.data.optionalSpecialization,
        personId: res.data.workerId || res.data.studentId,
        email: res.data.email,
        phone: res.data.phone,
        password: res.data.password,
        accessToken: res.data.accessToken,
        isSubmitted: true
     })
      console.log(this.state.userType)
  }
   else {
    alert("Invalid Form Criteria")
    event.target.reset();
  }
 })
 event.preventDefault()
}

//handleSubmit(e) {
   // e.preventDefault();

    //console.log('The form was submitted with the following data:');
    //console.log(this.state);
//}

render() {

    let newRoute = <Route exact path="/signup" render={props => (<Redirect to={`/dashboard/${this.state.email}/${this.state.userType}/${this.state.firstName}/${this.state.personId}/${this.state.accessToken}`} Component={Dashboard} />)}></Route>
      
    if (this.state.isSubmitted) {
      return newRoute;
    }

    return (
        <Container className="Form-container">
           <Title name= "Sign Up"></Title>
          <Row>
           <Col sm={12} align="center">
           <form onSubmit={this.signup}>
           
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="firstName"
                  size ="40"
                  placeholder= "Enter First Name*" 
                  required="required"
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="lastName"
                  size ="40"
                  placeholder= "Enter Last Name*" 
                  required="required"
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <br></br>
                <label for="userType" className ="Title-Style2"> Select User Role*: </label>
                <select name="userType" className ="InputFields3" id="type" required>
                  <option value="student">Student</option>
                  <option value="worker1">Worker</option>
                </select>
                <br></br>
                <br></br>
                <label for="workerType" className ="Title-Style2"> Select Worker Type* (or N/A otherwise): </label>
                <br></br>
                <select name="workerType" className ="InputFields2" id="type" required>
                  <option value="student">Social Worker</option>
                  <option value="worker1">Guidance Counselor</option>
                  <option value="other">Other</option>
                  <option value="other">N/A</option>
                </select>
                <br></br>
                  <label>
                    <input 
                      className ="InputFields" 
                      type="text" 
                      name="optionalType"
                      placeholder= "Enter Worker Type, If 'Other'" 
                      onChange={this.handleFormChange} />
                    </label>
                  <br></br>
                  <br></br>
                <label for="specialization" className ="Title-Style2"> Select Worker Specialization* (or N/A): </label>
                <br></br>
                <select name="specialization" className ="InputFields2" id="type" required>
                  <option value="student">Masters in Social Work</option>
                  <option value="worker1">Psychologist</option>
                  <option value="other">Other</option>
                  <option value="other">N/A</option>
                </select>
                <br></br>
                <label>
                    <input 
                      className ="InputFields" 
                      type="text" 
                      name="optionalSpecialization"
                      placeholder= "Enter Specialization, If 'Other'" 
                      onChange={this.handleFormChange} />
                    </label>
                  <br></br>
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="personId"
                  placeholder= "Enter Student or Worker ID*" 
                  required="required"
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                  <input 
                  className ="InputFields" 
                  type="text" 
                  name="email"
                  size ="320"
                  placeholder= "Enter Email Address*" 
                  required="required"
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                  <input 
                  className ="InputFields" 
                  type="text" 
                  name="phone"
                  size ="20"
                  placeholder= "Enter Phone Number" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                  <input 
                  className ="InputFields" 
                  name="password"
                  type="password" 
                  size ="40"
                  placeholder= "Enter Password*" 
                  required="required"
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <p className ="Title-Style3"> All fields marked with * are required</p>
                <input 
                className ="SubmitButton" 
                type="submit" 
                value="Submit!" />
            </form>
            <br></br>
            <Link to="/login" className="Signout">I already have an account</Link> 
           
           </Col>
          </Row>
        </Container>
      );
}
}

export default withRouter(SignupForm);

