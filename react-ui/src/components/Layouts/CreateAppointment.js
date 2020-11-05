import React, { Component, Fragment } from "react";
import CreateAppointmentForm from "../CreateAppointmentForm";

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      email:this.props.match.params.email
    }
  }
  render() {
    return (
      <Fragment>
        {/* <Header/> */}
        <CreateAppointmentForm user={this.props} id={this.state.id} email={this.props.email}/>
      </Fragment>
    );
  }
}

export default CreateAppointment;

