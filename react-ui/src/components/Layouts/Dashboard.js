import React, { Component, Fragment } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Page2 from "./Page2";
import IndexDashboard from "./IndexDashboard";
import NotFound from "./404";
import Header from "../Header"
import CreateAppointment from "./CreateAppointment"
import WorkerTimeInput from "./WorkerTimeInput";





class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false,
      email: this.props.match.params.email,
      type : this.props.match.params.type,
      firstName : this.props.match.params.name,
    };
  }

  componentDidMount() {
    console.log(this.state.firstName);
  }

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };

  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    let header;
    if(this.state.type ==="student"){
      header = <Header color="red"/>
    } else {
      header = <Header color="purple"/>
    }
   
    const { match } = this.props;
    return (
      <Fragment>
        {header}
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <div>
        <ul>
          <li>
            <Link to={`${match.path}`}>Dashboard</Link>
          </li>
          <li>
            <Link to={`${match.path}/page2`}>Page 2</Link>
          </li>
          <li>
            <Link to={`${match.path}/Signup`}>Sign-up</Link>
          </li>
          <li>
            <Link to={`${match.path}/CreateAppointment`}>Create Appointment</Link>
          </li>

          <li>
            <Link to ={`/WorkerInputpage`}>Worker Input Time Page</Link>

          </li>
    
          <li className="push-right">
            <button onClick={this.signOut} href="#">
              Sign Out
            </button>
          </li>
        </ul>
        <main role="main">
          <div className="main">
            <Switch>
              <Route path={`${match.path}/page2`}>
                <Page2 name={this.state.firstName}/>
              </Route>
      
              <Route path={`${match.path}/CreateAppointment`}>
                <CreateAppointment name={this.state.personId}/>
              </Route>

      
              {/* there should not be a Route path to sign up here */}
              {/* <Route path={`${match.path}/Signup`}>
                <Signup name={this.state.email}/>
              </Route> */}
              <Route exact path={`${match.path}`}>
                <IndexDashboard/>
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
