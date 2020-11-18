import React, { Component, Fragment } from "react";

import Title from "../Title"
import AppointmentList from "../AppointmentList/AppointmentList";
import EmergencyDayCancellation from "../EmergencyDayCancellation/EmergencyDayCancellation";

import UserTypes from '../../constants/userTypes.json';

class Home extends Component {
  render() {
    return (
      <Fragment>
        {this.props.userType === UserTypes.worker && <EmergencyDayCancellation user={this.props}/> }
        <Title name="Welcome"/>
        <AppointmentList user={this.props} />
      </Fragment>
    );
  }
}
export default Home;
