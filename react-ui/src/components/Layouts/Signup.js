import React, { Component, Fragment } from "react";
import Header from "../Header"
import SignupForm from "../SignUpForm";

class Signup extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <SignupForm/>
      </Fragment>
    );
  }
}
export default Signup;
