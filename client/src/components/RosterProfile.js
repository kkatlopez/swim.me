import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
//import { Link, withRouter } from 'react-router-dom';
import { Container, DropdownButton, Dropdown, Tabs, Tab, Table } from 'react-bootstrap';
import '../css/rosterprofile.css';
import { Link, withRouter } from 'react-router-dom';
import RosterProfileLatest from './RosterProfileLatest';
import RosterProfileFastest from './RosterProfileFastest.js';
import RosterProfileEvent from './RosterProfileEvent.js';
import Navigation from "./Navigation.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
// import { get } from 'express/lib/response';

class RosterProfile extends Component {

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
      firstname: this.props.match.params.firstName,
      lastname: this.props.match.params.lastName,
      year: "",
      hs: "",
      hometown: "",
      strokes: "",
      event: "",
      latestmeet: [],
      latestresults: [],
      fullname: "",
      fastest: [],
      meetlink: "",
      eventsswam: [],
      showLatest: false,
      show: false
      // showFastest: false,
      // showEvent: false,
    };
    this.getLatestMeet = this.getLatestMeet.bind(this);
    // this.showFastest = this.showFastest.bind(this);
    // this.showEvent = this.showEvent.bind(this);
  }

  getSwimmerInfo() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          // console.log(specific_result);
          this.setState({
            year: specific_result.classYear,
            hs: specific_result.highSchool,
            hometown: specific_result.hometown,
            strokes: specific_result.position,
            latestmeet: specific_result.meetsSwam.at(-1),
            fullname: this.state.firstname + " " + this.state.lastname
          })
        }
      )
  }

  getLatestMeet(latestmeet, fullname) {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.meetName === this.state.latestmeet[0] && x.meetStartDate === this.state.latestmeet[1]));
          var i, j, k, l;
          var latest = [];
          for (i = 0; i < specific_result.meetEvents.length; i++) {
            for (j = 0; j < specific_result.meetEvents[i].length; j++) {
              for (k = 0; k < specific_result.meetEvents[i][j].length; k++) {
                if (specific_result.meetEvents[i][j][k][0] === this.state.fullname) {                  
                  latest.push( [specific_result.meetEvents[i][0], specific_result.meetEvents[i][j][k][1], (k+1)] );
                }
              }
            }
          }
          this.setState({
            latestresults: latest
          });
        }
      )
  }

  getFastest() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          this.setState({
            fastest: specific_result.bestTimes,
          });
        }
      )
  }


  getEventsSwam() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          this.setState({
            eventsswam: specific_result.eventsSwam
          });
        }
      )
  }

  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push( { logged: logged, admin: admin, user: user} );
  }

  componentDidMount() {
    this.getSwimmerInfo();
    this.getLatestMeet(this.state.latestmeet, this.state.fullname);
    this.getFastest();
    this.getEventsSwam();
  }

  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/roster", { logged: logged, admin: admin, user: user} );
  }

  render() {
    // const { getLatestMeet } = this.state;
    // const { showFastest } = this.state;
    // const { showEvent } = this.state;

    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Roster</h1>
        </Container>
        <Container className="px-4">
          <a onClick={() => this.sendProps()} className="standalone meet-link">
              <p><FontAwesomeIcon icon={faChevronLeft} className="icon px-0"/> Back to full roster</p>
          </a>
          <h1 className="sectionTitle">{this.state.firstname} {this.state.lastname}</h1>
          <div className="d-flex">
              <div>
                  <img src="https://picsum.photos/300" className="img-thumbnail"></img>
              </div>
              <div className="info px-2">
                  <p><b>Position: </b>{this.state.strokes}</p>
                  <p><b>Class: </b>{this.state.year}</p>
                  <p><b>Hometown: </b>{this.state.hometown}</p>
                  <p><b>High School: </b>{this.state.hs}</p>
              </div>
          </div>
        </Container>
        <hr align="center"></hr>
        <Container className="px-4">
        <Tabs defaultActiveKey="latest" id="uncontrolled-tab-example" className="my-3 justify-content-center">
            <Tab eventKey="latest" title="Latest">
                <h2>{this.state.latestmeet[0]}</h2>
                <p class="text-muted">{moment(this.state.latestmeet[1]).format('ll')}</p>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Time</th>
                      <th>Place</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                      this.state.latestresults.map( (lister) => {
                        return(
                          <tr>
                            <td>{lister[0]}</td>
                            <td>{lister[1]}</td>
                            <td>{lister[2]}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
            </Tab>
            <Tab eventKey="fastest" title="Fastest">
              <Table bordered>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Time</th>
                    <th>Meet</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <a href></a>
                {
                    this.state.fastest.map( (lister) => {
                      return(
                        <tr>
                          <td>{lister[0]}</td>
                          <td>{lister[1]}</td>
                          <td>{lister[2]}</td>
                          <td>{moment(lister[3]).format('ll')}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="event" title="By Event">
              <label className="pt-3">Event</label>
              <DropdownButton className="dropdown pb-3" title="Select an event">
                {
                  this.state.eventsswam.map( (lister) => {
                    return(<Dropdown.Item>{lister}</Dropdown.Item>)
                  })
                }
              </DropdownButton>
            </Tab>
        </Tabs>
          {/* {(getLatestMeet && <RosterProfileLatest/>) ||
          (showFastest && <RosterProfileFastest/>) ||
          (showEvent && <RosterProfileEvent/> )} */}
        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}

export default withRouter(RosterProfile);
