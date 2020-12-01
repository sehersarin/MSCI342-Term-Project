import React from 'react'
import Check from './CheckboxApplication';
/* import './WorkerInputpage.scss'; */
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import moment from 'moment';
import queryString from "query-string";
import _ from 'lodash';
const axios = require("axios").default;

class WorkerInputpage extends React.Component {  
    render() {
         return(
            <div>
                <Check personId={this.props.personId} accessToken={this.props.accessToken}/>

            </div>
        )
    }
}
export default WorkerInputpage
/*
const rootElement = document.getElementById("root");
ReactDOM.render(<WorkerInputpage />, rootElement); */

