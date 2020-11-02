import React, {Component, Fragment} from "react";
import logo from '../logo.svg'
import "./Header.scss"

export default class Header extends Component {
    render() {

      let header;
      if(this.props.color==="red"){
        header =  (<header className="App-header-red">
                     <img src={logo} className="App-logo" alt="logo" />
                   </header>)
      } else (
        header = (<header className="App-header-blue">
                    <img src={logo} className="App-logo" alt="logo" />
                 </header>)
      )
      return (
        <Fragment>
       {header}
       </Fragment>
      );
    }
  }
