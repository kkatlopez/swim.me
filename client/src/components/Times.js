import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Form, FormControl, Button, Tabs, Tab } from 'react-bootstrap';
import MeetTimes from './MeetTimes.js';
import FastestTimes from './FastestTimes.js';
import EventTimes from './EventTimes.js';

class AllTimeTop10 extends Component {
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
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Times</h1>
        </Container>
        <Container className="px-4">
        <Form className="pb-3">
            <label>Search for a swimmer</label>
                <div className="d-flex">
                <FormControl
                type="search"
                placeholder="Enter a name"
                className="me-2"
                aria-label="Search"
                />
                <Button>Search</Button>   
            </div>
        </Form>
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
      </Container>      
    );
  }
}

export default(AllTimeTop10);
