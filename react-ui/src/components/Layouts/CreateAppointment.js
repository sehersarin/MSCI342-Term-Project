import React, { Component, Fragment } from "react";
import CreateAppointmentForm from "../CreateAppointmentForm";

class CreateAppointment extends Component {
  render() {
    return (
      <Fragment>
        {/* <Header/> */}
        <CreateAppointmentForm schoolId={this.props.match.params.schoolId}/>
      </Fragment>
    );
  }
}
export default CreateAppointment;

