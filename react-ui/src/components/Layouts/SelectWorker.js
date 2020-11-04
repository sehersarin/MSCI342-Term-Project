import React, { Component, Fragment } from "react";
import SelectWorkerForm from "../SelectWorkerForm";

class SelectWorker extends Component {
  render() {
    return (
      <Fragment>
        {/* <Header/> */}
        <SelectWorkerForm email={this.props.email}/>
      </Fragment>
    );
  }
}
export default SelectWorker;

