import React, { Component } from 'react';
import { Container, DropdownButton, Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/specificmeet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import SpecificMeetCard from './SpecificMeetCard';
import Navigation from "./Navigation.js";
import moment from 'moment';

class SpecificMeet extends Component {

  constructor(props) {
	  super(props);

    // redirect to login if not logged in
    if(this.props.location.state === undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged === false){
      this.props.history.push("/", { logged: false });
    }

    this.state = {
      meetname: "",
      meetdate: "",
      eventlist: [],
      eventname: [],
      logged: this.props.location.state.logged,
      admin: this.props.location.state.admin,
      user: this.props.location.state.user
    }
  }

  // retrieve meet info
  populateEvents() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.meetName === this.state.meetname && x.meetStartDate === this.state.meetdate));
          var namelist = [];
          var i;
          for (i = 0; i < specific_result.meetEvents.length; i++) {
            if (specific_result.meetEvents[i][1].length === 0) {
              continue;
            } else {
              namelist.push(specific_result.meetEvents[i][0]);
            }
          }
          this.setState({
            eventlist: specific_result.meetEvents,
            eventname: namelist,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  // initialize component before rendering
  componentDidMount(){
    var split = this.props.match.params.meetName.split('_');
    this.setState({
        meetname: split[0],
        meetdate: split[1]
    })
    this.populateEvents();
  }

  // send props to other admin components
  sendProps(eventname) {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/meet/" + this.state.meetname + "_" + this.state.meetdate + "/event/" + eventname, { logged: logged, admin: admin, user: user} );
  }

  // redirect to results page
  backToAllMeets() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/results", { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Meet Results</h1>
        </Container>
        <Container className="px-4 dynamic-height">
            <a onClick={() => this.backToAllMeets()} className="standalone meet-link">
              <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to all meets</p>
            </a>
            <h2 className="sectionTitle mt-1 mb-0">{this.state.meetname}</h2>
            <p class="text-muted">{moment(this.state.date).format('ll')}</p>
            <label>Event</label>
            <DropdownButton className="dropdown pb-3" title="Select an event">
            {
              this.state.eventname.map( (lister) => {
                  return(<Dropdown.Item onClick={() => this.sendProps(lister)} eventinfo={this.state.eventlist}
                  logged={this.props.location.state.logged}
                  admin={this.props.location.state.admin}
                  user={this.props.location.state.user}
                  >{lister}</Dropdown.Item>)
              })
            }
            </DropdownButton>
            <div className="specific-meet-cards">
            {
              this.state.eventname.map( (lister) => {
                  return(<SpecificMeetCard eventlink={"/meet/" + this.state.meetname + "_" + this.state.meetdate + "/event/" + lister} eventnameslist={this.state.eventname} eventname={lister} eventinfo={this.state.eventlist}
                  >{lister}</SpecificMeetCard>)
              })
            }
            </div>
        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}

export default withRouter(SpecificMeet);
