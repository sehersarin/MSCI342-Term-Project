import React, { Component, Fragment } from "react";
import SelectWorkerForm from "../SelectWorkerForm";

class SelectWorker extends Component {
  render() {
    return (
      <Fragment>
        {/* <Header/> */}
        <SelectWorkerForm user={this.props} workerId = {this.props.workerId} />
      </Fragment>
    );
  }
}
export default SelectWorker;


