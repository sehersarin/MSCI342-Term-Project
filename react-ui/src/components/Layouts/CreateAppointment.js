import React, { Component, Fragment } from "react";
import CreateAppointmentForm from "../CreateAppointmentForm";

class CreateAppointment extends Component {
  render() {
    return (
      <Fragment>
        {/* <Header/> */}
        <CreateAppointmentForm user={this.props}/>
      </Fragment>
    );
  }
}
export default CreateAppointment;

