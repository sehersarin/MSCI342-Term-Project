import React, { Component, Fragment } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import Page2 from "./Page2";
import IndexDashboard from "./IndexDashboard";
import NotFound from "./404";
import Header from "../Header"


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false,
      name: this.props.match.params.name,
      type : this.props.match.params.type
    };
  }

  componentDidMount() {
    console.log(this.state.name);
  }

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };
  //conditional rendering for the win
 



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
                <Page2 name={this.state.name}/>
              </Route>
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
