import React, {Component} from "react";
import "./Title.scss";

export default class Title extends Component {
    render() {
      return (
        <div>   
            <p className="Title-Style">{this.props.name}</p>
        </div>
      );
    }
  }
