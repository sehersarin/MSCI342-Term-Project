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
      
        first_name:"",
        last_name:"",
        role:"",
        optional_role:"",
        id_value:"",
        email: "",
        phone:"",
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
           
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="first_name"
                  size ="40"
                  placeholder= "Enter First Name" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                <input 
                  className ="InputFields" 
                  type="text" 
                  name="last_name"
                  size ="40"
                  placeholder= "Enter Last Name" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <br></br>
                <label for="role" className ="Title-Style2"> Select Role: </label>
                <select name="role" className ="InputFields2" id="type">
                  <option value="student">Student</option>
                  <option value="worker1">Guidance Counselor</option>
                  <option value="worker2">Master of Social Work</option>
                  <option value="worker3">Psychologist</option>
                  <option value="other">Other</option>
                </select>
                <br></br>
                {/* <br></br> */}
                  <label>
                    <input 
                      className ="InputFields" 
                      type="text" 
                      name="optional_role"
                      placeholder= "Enter Role, If 'Other' Selected" 
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
                  name="email"
                  size ="320"
                  placeholder= "Enter Email Address" 
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
                  placeholder= "Enter Password" 
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

