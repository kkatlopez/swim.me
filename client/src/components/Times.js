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
        firstname: '',
        lastname: '',
        results: [],
        bestTimes: [],
        eventsSwam: [],
        meetsSwam: []
    };
  }

  // getSwimmerTimes(url) {
  //   fetch("http://localhost:3001/specific_swimmer", {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({name: url})
  //   })
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         console.log(result);
  //         var splitname = url.split(' ');
  //         var specific_result = result.find(x => (x.firstName === splitname[0] && x.lastName === splitname[1]));
  //         console.log(specific_result);
  //         console.log(specific_result.bestTimes);
  //         this.setState({
  //           bestTimes: specific_result.bestTimes,
  //           eventsSwam: specific_result.eventsSwam,
  //           meetsSwam: specific_result.meetsSwam
  //         });
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }
  
  // componentDidMount(){
  //   var name = this.props.match.params.swimmerName;
  //   console.log("hello");
  //   this.getSwimmerTimes(name);
  // }

  populateEvents() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          // console.log(specific_result);
          // var namelist = [];
          // var i;
          // for (i = 0; i < specific_result.meetEvents.length; i++) {
          //   if (specific_result.meetEvents[i][1].length === 0) {
          //     continue;
          //   } else {
          //     namelist.push(specific_result.meetEvents[i][0]);
          //   }
          // }
          this.setState({
            results: specific_result
          });
          console.log(this.state.results);
          console.log(specific_result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount(){
    var split = this.props.match.params.swimmerName.split(' ');
    console.log(split);
    this.setState({
        firstname: split[0],
        lastname: split[1]
    });
    this.populateEvents();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">{this.state.firstname} {this.state.lastname}</h1>
        </Container>
        <Container className="px-4">
        <br/>
        <Tabs defaultActiveKey="meet" id="uncontrolled-tab-example" className="mb-3 justify-content-center">
            <Tab eventKey="meet" title="Meet">
                <MeetTimes name={this.props.match.params.swimmerName}/>
            </Tab>
            <Tab eventKey="fastest" title="Fastest">
                <FastestTimes name={this.props.match.params.swimmerName}/>
            </Tab>
            <Tab eventKey="event" title="By Event">
                <EventTimes name={this.props.match.params.swimmerName}/>
            </Tab>
        </Tabs>
        </Container>
      </Container>      
    );
  }
}

export default(Times);
