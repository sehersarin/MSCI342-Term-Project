import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./SignupForm.css"
import dashboard from "./Layouts/Dashboard"
import { Link } from 'react-router-dom';

//This class is used to create a Sign-up component where users enter their name, email and password to create an account.
//If they have previously made an account they can click on "I already have an account" and be redirected to the sign-in page.
class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        name:"",
        email: "",
        password: "",
     
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e) {
    let target = e.target;
    let name = target.name; 
}

handleSubmit(e) {
    e.preventDefault();

    console.log('The form was submitted with the following data:');
    console.log(this.state);
}

render() {
    return (
        <Container className="Form-container">
           <Title name= "Sign Up."></Title>
          <Row>
           <Col sm={12} align="center">
           <form onSubmit={this.login}>
           <label for="role"> Select Role: </label>
          <select name="role" id="type">
            <option value="student">Student</option>
            <option value="worker">Guidance Counselor</option>
            <option value="worker">Master of Social Work</option>
            <option value="worker">Psychologist</option>
            <option value="worker">Other</option>
          </select>
              <br></br>
              <br></br>
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="user_name"
                  size ="40"
                  placeholder= "Enter First Name" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="user_name_last"
                  size ="40"
                  placeholder= "Enter Last Name" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="id_value"
                  placeholder= "Enter Student or Worker ID" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                  <input 
                  className ="InputFields" 
                  type="text" 
                  name="user_id"
                  size ="320"
                  placeholder= "Enter Email Address" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                  <input 
                  className ="InputFields" 
                  type="text" 
                  name="user_phone"
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
                  placeholder= "Enter Password" 
                  onChange={this.handleFormChange} />
                </label>
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

