import React, { Component, Fragment } from "react";

import Title from "../Title"
import AppointmentList from "../AppointmentList/AppointmentList";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Title name="Welcome"/>
        <AppointmentList user={this.props} />
      </Fragment>
    );
  }
}
export default Home;
