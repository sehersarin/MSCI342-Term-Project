import React, { Component, Fragment, Router } from "react";
import { withRouter } from "react-router";
import { Redirect, Switch, Route, Link } from "react-router-dom";

import "./Dashboard.scss";

import logo from '../../logo.svg'
import Profile from "../Layouts/Profile";
import Home from "../Layouts/Home";
import NotFound from "../Layouts/404";
import CreateAppointment from "../Layouts/CreateAppointment";
import Availability from "../Layouts/Availability";

import UserTypes from '../../constants/userTypes.json';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogout: false,
      email: this.props.match.params.email,
      userType: this.props.match.params.userType,
      firstName: this.props.match.params.name,
      personId: this.props.match.params.personId,
      accessToken: this.props.match.params.accessToken,
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
    const { email, firstName, personId, userType, accessToken } = this.state;

    return (
      <Fragment>
        <header className={userType}>
          <div className="column left">
            <img src={logo} className="App-logo" alt="logo" />
          </div>

          <div className="column right">
            <ul className="topnav">
              <li>
                <Link to={`/dashboard`}>Home</Link>
              </li>
              <li>
                <Link to={`/dashboard/Availability`}>Availability</Link>
              </li>
              <li>
                <Link to={`/dashboard/Profile/${email}`}>Profile</Link>
              </li>
              {/* Only display the book appointment form if the user is a student. */}
              {userType === UserTypes.student &&
                <li>
                  <Link to={`/dashboard/CreateAppointment/${email}`}>Create Appointment</Link>
                </li>
                
              }
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
                  <Profile name={firstName} />
                </Route>
                <Route path={`/dashboard/CreateAppointment`}>
                  <CreateAppointment name={personId} />
                </Route>
                <Route path={`/dashboard/Availability`}>
                  <Availability />
                </Route>
                <Route exact path={`${this.props.match.path}`}>
                  <Home userType={userType} personId={personId} accessToken={accessToken} />
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
