import React, { Component } from 'react';
import { Container, Tabs, Tab, } from 'react-bootstrap';
import '../css/rosterprofile.css';
import { withRouter } from 'react-router-dom';
import RosterProfileLatest from './RosterProfileLatest';
import RosterProfileFastest from './RosterProfileFastest.js';
import RosterProfileEvent from './RosterProfileEvent.js';
import Navigation from "./Navigation.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';

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
      fullname: "",
      imageurl: ""
    };
  }

  getSwimmerInfo() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          this.setState({
            year: specific_result.classYear,
            hs: specific_result.highSchool,
            hometown: specific_result.hometown,
            strokes: specific_result.position,
            latestmeet: specific_result.meetsSwam.at(-1),
            fullname: this.state.firstname + " " + this.state.lastname,
            imageurl: specific_result.picture
          })
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
  }


  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/roster", { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Roster</h1>
        </Container>
        <Container className="px-4">
          <a onClick={() => this.sendProps()} className="standalone meet-link">
              <p className="pb-2"><FontAwesomeIcon icon={faChevronLeft} className="icon px-0"/> Back to full roster</p>
          </a>
          <h1 className="sectionTitle">{this.state.firstname} {this.state.lastname}</h1>
          <div className="d-flex row">
              <div className="col-5">
                  <img src={this.state.imageurl} className="img-thumbnail"></img>
              </div>
              <div className="col info px-2">
                  <p><b>Position: </b>{this.state.strokes}</p>
                  <p><b>Class: </b>{this.state.year}</p>
                  <p><b>Hometown: </b>{this.state.hometown}</p>
                  <p><b>High School: </b>{this.state.hs}</p>
              </div>
          </div>
        </Container>
        <Container className="px-4">
        <Tabs defaultActiveKey="latest" id="uncontrolled-tab-example" className="my-3 justify-content-center">
            <Tab eventKey="latest" title="Latest">
              <RosterProfileLatest latesttimes={this.state.latestresults} latestmeet={this.state.latestmeet}/>
            </Tab>
            <Tab eventKey="fastest" title="Fastest">
              <div className="dynamic-height">
                <RosterProfileFastest/>
              </div>
            </Tab>
            <Tab eventKey="event" title="By Event">
              <RosterProfileEvent/>
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
