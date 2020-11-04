import React, {Component} from "react";
import { Container, Row, Col } from 'react-grid-system';
import { Redirect, Route, withRouter } from "react-router-dom";
import Title from "./Title"
import "./CreateAppointmentForm.scss"
// import dashboard from "./Layouts/Dashboard"
import { Link } from 'react-router-dom';

import queryString from 'query-string'

const axios = require('axios').default;

class InputAvailability extends Component {
    constructor(props) {
        super(props);
        this.state = {
          val:"",
          isChecked:"",
          items: [],
          accessToken: "",
          timeslots: {
          }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckbox= this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    var params = { accessToken: "XcCa92ZvOnQKZsGtOKOa"}
    axios.get(`/api/possible-timeslots/?${queryString.stringify(params)}`)
    .then(res => {
      if(res.data!==""){
        this.setState({
            items:res.data
          });
            console.log(this.state.items)
      }
    })
  }
  handleCheckbox = event => {
    const a = event.target.value
    const b= event.target.checked
    let updatedAvail = Object.assign({}, this.state.timeslots, {[a]:b})
    this.setState({
      timeslots : updatedAvail
    });
  };

  handleSubmit= event => {
      event.preventDefault();
      console.log(this.state.timeslots)
    //   componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.userID !== prevProps.userID) {
    //       this.fetchData(this.props.userID);
    //     }
    //   }
  } 

  render() {
    const listItems = this.state.items.map((el)=>
    <React.Fragment>
        
        <input type="checkbox" id={el.timeslotId} value ={el.timeslotId} onChange={this.handleCheckbox}/>
      
        <div>
        {el.startTime + " to " + el.endTime}
        </div> 
      
    </React.Fragment>)

      return (
          <Container className="Form-container">
           
            <Row>
             <Col sm={12} align="center">
             <Title name= "Availability"></Title>
             <form onSubmit={this.handleSubmit}> 
                   {listItems}
                  <br></br>
                  <br></br>
                  <label>
                      </label>
                    <br></br>
                  <label>
                  <br></br>
                  <input
                  className ="SubmitButton" 
                  type="submit" 
                  value="Submit!" />
                  </label>
              </form> 
              <br></br>
             <Link to="/successfulappointmentbooking" className="Signout">Continue to next page</Link>         
             </Col>
            </Row>
          </Container>
        );
  }
}
  
  export default InputAvailability;
  

