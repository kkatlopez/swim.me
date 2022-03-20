import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, FormControl, Button, Tabs, Tab } from 'react-bootstrap';
import MeetTimes from './MeetTimes.js';
import FastestTimes from './FastestTimes.js';
import EventTimes from './EventTimes.js';

class Times extends Component {
  constructor(props) {
	super(props);
    this.state = {
        specificswimmer: {},
        bestTimes: [],
        eventsSwam: [],
        meetsSwam: []
    };
    }

    componentDidMount(){
        var node = document.getElementsByClassName('divider text')[0];
        var a = ReactDOM.findDOMNode(node);
        console.log(a.textContent);
        var splitname = a.textContent.split(" ");
        console.log(this.props.swimmers);
        var specific_result = this.props.swimmers.find(x => (x.firstName === splitname[0] && x.lastName === splitname[1]));
        console.log(specific_result);
        console.log(specific_result.bestTimes);
        this.setState({ 
            specificswimmer: specific_result,
            bestTimes: specific_result.bestTimes,
            eventsSwam: specific_result.eventsSwam,
            meetsSwam: specific_result.meetsSwam
        }, () => {
            console.log(this.state.specificswimmer, 'hello');
            console.log(this.state.bestTimes);
            console.log(this.state.eventsSwam);
            console.log(this.state.meetsSwam);
          }); 
    }

  render() {
    return(
      <Container fluid className="page-container">
        <Tabs defaultActiveKey="meet" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
            <Tab eventKey="meet" title="Meet">
                <MeetTimes meet={this.state.meetsSwam}/>
            </Tab>
            <Tab eventKey="fastest" title="Fastest">
                <FastestTimes best={this.state.bestTimes}/>
            </Tab>
            <Tab eventKey="event" title="By Event">
                <EventTimes event={this.state.eventsSwam}/>
            </Tab>
        </Tabs>
      </Container>      
    );
  }
}

export default(Times);
