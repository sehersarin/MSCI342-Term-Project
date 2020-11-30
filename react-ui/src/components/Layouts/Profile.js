import React, {Component} from 'react'
import moment from 'moment'
import {render} from 'react-dom'
import { Link } from "react-router-dom";
import "./Profile.css"
// import 'react-big-calendar/lib/sass/styles';
import { Container, Row, Col } from 'react-grid-system';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'

// import events from '../events'
// import ExampleControlSlot from '../ExampleControlSlot'
const localizer = momentLocalizer(moment)
const propTypes = {}

class Selectable extends React.Component {
  constructor(...args) {
    super(...args)
    const now = new Date();
    const minTime = new Date();
    minTime.setHours(9,0,0)
    const maxTime = new Date();
    const events =[
      {
        id: 0,
        start: new Date(2020, 11, 4, 9, 0, 0),
        end: new Date(2020, 11, 4, 10, 30, 0)
      },
      {
        id: 1,
        start: new Date(2020, 11, 1, 11, 0, 0),
        end: new Date(2020, 11, 1, 13, 30, 0)
      },
      {
        id: 2,
        start: new Date(2020, 10, 30, 10, 0, 0),
        end: new Date(2020, 10, 30, 13, 14, 30, 0)
      }
    ]
    maxTime.setHours(17,0,0)
        this.state = { 
          personId: this.props.personId,
          minTime: minTime,
          maxTime: maxTime,
          events: events,
        }
        this.handleSlotSelect = this.handleSlotSelect.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleSlotSelect= ({id})=> {
    const del = window.confirm('delete entry?')
    if(del===true){
      this.setState((prevState)=>{
        const events = this.state.events
        events[id]= ""
        console.log(events)
        return {events}
      })
      }
    }
  //if the id is "", and it exists, delete the entry with that ID.
  //if the id and is not null exists, do nothing
  //if the id does not exists and is not null, add to the file.

  handleSelect = ({ start, end }) => {
    // const title = window.prompt('New Event name')
    // if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            id : this.state.events.length,
            start,
            end
          },
        ],
      })
      console.log(this.state.events)
      // console.log(this.state.personId)
  }

  handleSubmit(event) {
    console.log(this.state.events)
    alert('Your times entries are placed')
    // submits selected days and assigns recurrenting dates based off boxes checked
  }
// on submit do the logic

  //would need the API to look like those slots though
  //just give Kyle the whole thing
  //basically you have events[0].start and events[0].end and loop it with workerID
  //and then you can break it apart into time intervals of 30 mins and loop them
  
  //create a fake events and see if it pre-populates
  //component did mount updates the new thing, the current one adds

  render() {
    // const { localizer } = this.props
    return (
      <>
        {/* <ExampleControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
          </strong>
        </ExampleControlSlot.Entry> */}
        <div className="pageSelect">
        <Container fluid>
        <Row justify="center" align="center">
         <Col md={7}>
          <Calendar
            selectable
            localizer={localizer}
            events={this.state.events}
            min={this.state.minTime}
            max={this.state.maxTime}
            timeslots={2}
            defaultView={Views.WEEK}
            views={['day','week']}
            defaultDate={moment().toDate()}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={this.handleSlotSelect}
            //event.title
            onSelectSlot={this.handleSelect}
        />
        </Col>
        </Row>
        
        <br>
        </br><br>
        </br><br>
        </br>
         <div align="center">
         {/* <form onSubmit={this.handleSubmit}> */}
               <input
                onClick ={this.handleSubmit}
                className="SubmitButton"
                type="submit"
                value="Add Availability"
              />
          {/* </form> */}
              <br></br>
            </div>
            </Container>
            </div>
      </>
    )
  }
}

Selectable.propTypes = propTypes

export default Selectable