import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter, Link} from "react-router-dom";
import Title from "./Title"
import "./LogInForm.css"
import dashboard from "./Layouts/Dashboard"
import queryString from 'query-string'
import Signup from "./Layouts/Signup"

const axios = require('axios').default;

class logInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      type: "",
      firstName: "",
      loginParams: {
        email: "",
        password: "",
      }
    };
  }

  handleFormChange = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };


  login = event => {
    let email = this.state.loginParams.email;
    let password = this.state.loginParams.password;
    var params = {email: email, password: password}
    axios.get(`/public/login/?${queryString.stringify(params)}`)
    .then(res => {
      if(res.data!==""){
        this.setState({
          email : res.data.email,
          type: res.data.type,
          firstName: res.data.firstName,
          islogged: true
        })
        // localStorage.setItem("token", "T");
        console.log(this.state.type)
      }
    })
    event.preventDefault();
  } 

  render() {
    let newRoute= <Route exact path="/login" render={props => ( <Redirect to={`/dashboard/${this.state.loginParams.email}/${this.state.type}/${this.state.firstName}`} Component={dashboard}/>)}></Route> 
  
    if (this.state.islogged) {
      return newRoute;
    }
      return (
        <Container className="Form-container">
           <Title name= "Log In."></Title>
          <Row>
           <Col sm={12} align="center">
           <form onSubmit={this.login}>
                <label>
                  <input 
                  className ="InputFields" 
                  type="text" 
                  name="email"
                  placeholder= "email" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <label>
                  <input 
                  className ="InputFields" 
                  name="password"
                  type="password" 
                  placeholder= "password" 
                  onChange={this.handleFormChange} />
                </label>
                <br></br>
                <input 
                className ="SubmitButton" 
                type="submit" 
                value="Log In!" />
            </form>
            <br></br>
            <Link to={`/signup`}>Don't have an account?</Link>
            <Route path="/signup" component={Signup}></Route>
            </Col>
           </Row>
        </Container>
      );
    }
  }
  export default withRouter(logInForm);
  
