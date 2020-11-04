import React, { Component, Fragment } from "react";
import CreateAppointmentForm from "../CreateAppointmentForm";

class CreateAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.match.params.id,
    }
  }
  render() {
    return (
      <Fragment>
        {/* <Header/> */}
        <CreateAppointmentForm id={this.state.id}/>
      </Fragment>
    );
  }
}

export default CreateAppointment;

