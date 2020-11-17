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
      var params = { accessToken: "XcCa92ZvOnQKZsGtOKOa"}
      axios.get(`/api/possible-timeslots/?${queryString.stringify(params)}`)
      .then(res => {
        if(res.data!==""){
          this.setState({
              items:res.data
            });
        }
      })
    //post this.state.timeslots to backend
    // axios.post('/', { fname, lname, email })
    // .then((result) => {
    //   //access the results here....
    // });
  } 

  render() {

    function tConvert (time) {
      // Check correct time format and split into components
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
     
      if (time.length > 1) { // If time format correct
        time = time.slice (1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join (''); // return adjusted time or original string
    }


    const listItems = this.state.items.map((el)=>
    <React.Fragment>
        <label> 
        <input type="checkbox" id={el.timeslotId} value ={el.timeslotId} onChange={this.handleCheckbox}/>
        {tConvert(el.startTime) + " to " + tConvert(el.endTime)}
      
       
        </label>
        <br></br>
      
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
  

