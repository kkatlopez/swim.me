import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/event.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';

class Event extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
      name: "",
      meetname: "",
      meetdate: "",
      results: []
      }
    // if(this.props.location.state == undefined){
		// 	this.props.history.push("/", { logged: false });
		// }
		// else if (!('logged' in this.props.location.state)){
		// 	this.props.history.push("/", { logged: false });
		// }
		// else if(this.props.location.state.logged == false){
		// 	this.props.history.push("/", { logged: false });
		// }
  }

  // use populateEvents() from SpecificMeet.js 
  showResultTable() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var specific_result = result.find(x => (x.meetName === this.state.meetname && x.meetStartDate === this.state.meetdate));
          var i;
          var eventresults = [];
          console.log(specific_result);
          for (i = 0; i < specific_result.meetEvents.length; i++) {
            if (specific_result.meetEvents[i][0] == this.state.name) {
              eventresults = specific_result.meetEvents[i];
            }
          }
          this.setState({
            results: eventresults[1]
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
  
  componentDidMount(){
    var event = this.props.match.params.eventName;
    var split = this.props.match.params.meetName.split('_');
    this.setState({
        name: event,
        meetname: split[0],
        meetdate: split[1]
    })
    this.showResultTable();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Event Results</h1>
        </Container>
        <Container className="px-4">
            <a href={"/meet/" + this.props.match.params.meetName} className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to meet</p>
            </a>
            <h2>{this.state.name}</h2>            
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
      </Container>
    );
  }
}

export default (Event);