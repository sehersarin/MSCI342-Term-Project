import React, { Component } from 'react'
import LogIn from "./components/Layouts/LogIn"
import Dashboard from "./components/Layouts/Dashboard"
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import AvailableMeetingHeader from './components/AvailableMeetingHeader';


class App extends Component {
  state = {
    postgres: null,
    error: null
  }
  render() {
    
    return (
      <div className="App">
        <AvailableMeetingHeader/>
        <Router>
      <Switch>
        <Route path = "/AvailableMeetingHeader" Component = {AvailableMeetingHeader}></Route> {/* this is test code line*/}
        <Route path="/login" component={LogIn}>
          {/* <LogIn /> */}
        </Route>
        {/* <ProtectedRoute path="/dashboard/" component={Dashboard}> */}
          {/* <Dashboard /> */}
        {/* </ProtectedRoute> */}
        <Route exact path="/dashboard/:id" component={Dashboard}>
          {/* removed exact path  for both top and bottom*/}
          {/* <Redirect from="/" to="dashboard/" /> */}
        </Route>
        <Route path="/dashboard/" component={Dashboard}>
          {/* removed exact path  for both top and bottom*/}
          {/* <Redirect from="/" to="dashboard/" /> */}
        </Route>
        <Route path="/dashboard/" component={Dashboard}>
          {/* removed exact path  for both top and bottom*/}
          {/* <Redirect from="/" to="dashboard/" /> */}

        </Route>
        <Route path="*">
          <Redirect from="/" to="dashboard/" />
        </Route>
      </Switch>
    </Router>
      </div>
    )
  }
}

export default App
