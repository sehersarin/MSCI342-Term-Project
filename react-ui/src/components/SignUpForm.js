import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./SignupForm.scss"
// import dashboard from "./Layouts/Dashboard"
import { Link } from 'react-router-dom';

//This class is used to create a Sign-up component where users enter their name, email, role, type and password to create an account.
//If they have previously made an account they can click on "I already have an account" and be redirected to the sign-in page.
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        first_name:"",
        last_name:"",
        role:"",
        worker_type:"",
        optional_type:"",
        specialization:"",
        optional_specialization:"",
        id_value:"",
        email: "",
        phone:"",
        user_password: "",
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

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

    //console.log('The form was submitted with the following data:');
    //console.log(this.state);
}

render() {
    return (
        <Container className="Form-container">
           <Title name= "Sign Up."></Title>
          <Row>
           <Col sm={12} align="center">
           <form onSubmit={this.login}>
           
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="first_name"
                  size ="40"
                  placeholder= "Enter First Name*" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="last_name"
                  size ="40"
                  placeholder= "Enter Last Name*" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <br></br>
                <label for="role" className ="Title-Style2"> Select User Role*: </label>
                <select name="role" className ="InputFields3" id="type">
                  <option value="student">Student</option>
                  <option value="worker1">Worker</option>
                </select>
                <br></br>
                <br></br>
                <label for="worker_type" className ="Title-Style2"> Select Worker Type* (or N/A otherwise): </label>
                <br></br>
                <select name="worker_type" className ="InputFields2" id="type">
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
                      name="optional_type"
                      placeholder= "Enter Worker Type, If 'Other'" 
                      onChange={this.handleFormChange} />
                    </label>
                  <br></br>
                  <br></br>
                <label for="specialization" className ="Title-Style2"> Select Worker Specialization* (or N/A): </label>
                <br></br>
                <select name="specialization" className ="InputFields2" id="type">
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
                      name="optional_specialization"
                      placeholder= "Enter Specialization, If 'Other'" 
                      onChange={this.handleFormChange} />
                    </label>
                  <br></br>
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="id_value"
                  placeholder= "Enter Student or Worker ID*" 
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
                  name="user_password"
                  type="password" 
                  size ="40"
                  placeholder= "Enter Password*" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <br></br>
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

export default SignupForm;

