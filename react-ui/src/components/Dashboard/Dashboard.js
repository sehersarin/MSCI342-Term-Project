import React, { Component, Fragment, Router } from "react";
import { withRouter } from "react-router";
import { Redirect, Switch, Route, Link } from "react-router-dom";

import "./Dashboard.scss";

import logo from '../../logo.svg'
import Page2 from "../Layouts/Page2";
import IndexDashboard from "../Layouts/Home";
import NotFound from "../Layouts/404";
import CreateAppointment from "../Layouts/CreateAppointment";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false,
      email: this.props.match.params.email,
      userType : this.props.match.params.userType,
      firstName : this.props.match.params.name,
    };
  }
  
  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      isLogout: true
    });
  };

  render() {
    // Returns the login screen if the user decides to log out of the system.
    if (this.state.isLogout) return <Redirect to="/login" />;

    // Else it will display the appropriate header based on the user type.
    // const { email, firstName, personId, userType } = this.props.params.params;

    return (
      <Fragment>
        <header className={this.state.userType}>
          <div className="column left">
            <img src={logo} className="App-logo" alt="logo" />
          </div>

          <div className="column right">
            <ul className="topnav">
              <li>
                <Link to={`/dashboard`}>Home</Link>
              </li>
              <li>
                <Link to={`/dashboard/Profile/${this.state.email}`}>Profile</Link>
              </li>
              <li>
                <Link to={`/dashboard/CreateAppointment/${this.state.email}`}>Create Appointment</Link>
              </li>
              <li className="push-right">
                <button onClick={this.signOut} href="#">Sign Out</button>
              </li>
            </ul>
          </div>
        </header>

        <div>
          <main role="main">
            <div className="main">
              <Switch>
                <Route path={`/dashboard/Profile`}>
                  <Page2 name={this.state.firstName} />
                </Route>
                <Route path={`/dashboard/CreateAppointment`}>
                  <CreateAppointment name={this.state.personId} />
                </Route>
                <Route exact path={`${this.props.match.path}`}>
                  <IndexDashboard />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Dashboard);
