import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Form, FormControl, Button, Tabs, Tab } from 'react-bootstrap';
import MeetTimes from './MeetTimes.js';
import FastestTimes from './FastestTimes.js';
import EventTimes from './EventTimes.js';

class Times extends Component {
  constructor(props) {
	super(props);
    this.state = {
        event: "",
        showLatest: false
    };
    }

  render() {
    return(
      <Container fluid className="page-container">
        <Tabs defaultActiveKey="meet" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
            <Tab eventKey="meet" title="Meet">
                {/* i think i need to create a component for each of these tiles that are then triggered by an on-click function */}
                <MeetTimes/>
            </Tab>
            <Tab eventKey="fastest" title="Fastest" onClick={() => this.showMeet("")}>
                <FastestTimes/>
            </Tab>
            <Tab eventKey="event" title="By Event">
                <EventTimes/>
            </Tab>
        </Tabs>
      </Container>      
    );
  }
}

export default(Times);
