import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/event.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation.js";

class Event extends Component {
  constructor(props) {
	super(props);
    this.state = {
      name: this.props.match.params.eventName,
      meetname: "",
      meetdate: "",
      results: []
    }

    // redirect to login if not logged in
    if (this.props.location.state === undefined) {
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)) {
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged === false) {
      this.props.history.push("/", { logged: false });
    }
  }

  // getting information for result table
  showResultTable() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          var split = this.props.match.params.meetName.split('_');
          var meet = split[0];
          var date = split[1];
          var specific_result = result.find(x => (x.meetName === meet && x.meetStartDate === date));
          var i;
          var eventresults = [];
          for (i = 0; i < specific_result.meetEvents.length; i++) {
            if (specific_result.meetEvents[i][0] === this.state.name) {
              eventresults = specific_result.meetEvents[i];
            }
          }
          this.setState({
            results: eventresults[1],
            meetname: meet,
            meetdate: date
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
    this.showResultTable();
  }

  // send props to other components
  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/meet/"+ this.state.meetname + "_" + this.state.meetdate, { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Event Results</h1>
        </Container>
        <Container className="px-4">
            <a onClick={() => this.sendProps()} className="standalone meet-link">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to meet</p>
            </a>
            <h2 className="sectionTitle">{this.state.name}</h2>
            <div className="event">
                <Table bordered>
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.results.map( (lister) => {
                      return(
                        <tr>
                          <td>{lister[0]}</td>
                          <td>{lister[1]}</td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
            </div>

        </Container>
				<Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}

export default withRouter(Event);
