import React, { Component, Fragment } from "react";
import Header from "../Header"
import CreateAppointmentForm from "../CreateAppointmentForm";

class CreateAppointment extends Component {
  render() {
    return (
      <Fragment>
        {/* <Header/> */}
        <CreateAppointmentForm user={this.props} workerId = {this.props.workerId}/>
      </Fragment>
    );
  }
}
export default CreateAppointment;

