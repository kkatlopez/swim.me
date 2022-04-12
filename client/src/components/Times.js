import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, FormControl, Tabs, Tab } from 'react-bootstrap';
import MeetTimes from './MeetTimes.js';
import FastestTimes from './FastestTimes.js';
import EventTimes from './EventTimes.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from "./Navigation.js";
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import '../css/times.css';

class Times extends Component {
  constructor(props) {
	super(props);
  if(this.props.location.state == undefined){
    this.props.history.push("/", { logged: false });
  }
  else if (!('logged' in this.props.location.state)){
    this.props.history.push("/", { logged: false });
  }
  else if(this.props.location.state.logged == false){
    this.props.history.push("/", { logged: false });
  }
  this.state = {
      firstname: '',
      lastname: '',
      results: [],
      bestTimes: [],
      eventsSwam: [],
      meetsSwam: []
  };
  }

  populateEvents() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          this.setState({
            results: specific_result
          });
          //console.log(this.state.results);
          //console.log(specific_result);
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
    //console.log(split);
    this.setState({
        firstname: split[0],
        lastname: split[1]
    });
    this.populateEvents();
  }

  backToAllTimes() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/times", { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">{this.state.firstname} {this.state.lastname}</h1>
        </Container>
        <Container className="px-4 dynamic-height">
        <a onClick={() => this.backToAllTimes()} className="standalone times-link">
          <p className="pb-2"><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to search</p>
        </a>

        <Tabs defaultActiveKey="meet" id="uncontrolled-tab-example" className="my-3 justify-content-center">
            <Tab eventKey="meet" title="Meet">
                <MeetTimes name={this.props.match.params.swimmerName}/>
            </Tab>
            <Tab eventKey="fastest" title="Fastest">
                <FastestTimes name={this.props.match.params.swimmerName}/>
            </Tab>
            <Tab eventKey="event" title="By Event">
                {/* <EventTimes name={this.props.match.params.swimmerName}/> */}
            </Tab>
        </Tabs>
        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}

export default withRouter(Times);
