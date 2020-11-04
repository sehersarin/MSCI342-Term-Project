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
<<<<<<< HEAD
        <CreateAppointmentForm id={this.state.id}/>
=======
        <CreateAppointmentForm user={this.props}/>
>>>>>>> b8d7aa5e49603ebdc4111386268290e5d6b775ee
      </Fragment>
    );
  }
}

export default CreateAppointment;

