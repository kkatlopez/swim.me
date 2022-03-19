import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Table} from 'react-bootstrap';
import '../css/event.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';

class Event extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
      name: "",
      meetname: "",
      meetdate: ""
      }
  }

  // use populateEvents() from SpecificMeet.js 

  populateEvents() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.meetName === this.state.name && x.meetStartDate === this.state.date));
          //var specific_event = specific_result.find(x => (x.eventName === this.statename))
          var namelist = [];
          var i;
          for (i = 0; i < specific_result.meetEvents.length; i++) {
            if (specific_result.meetEvents[i][1].length == 0) {
              continue;
            } else {
              namelist.push(specific_result.meetEvents[i][0]);
            }
          }
          this.setState({
            eventlist: specific_result.meetEvents,
            eventname: namelist
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
                        <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>Rensselaer</td>
                        <td>1:54.53</td>
                        <td>11.00</td>
                    </tr>
                    <tr>
                        <td>Rensselaer</td>
                        <td>1:56.95</td>
                        <td>4.00</td>
                    </tr>
                    <tr>
                        <td>Skidmore</td>
                        <td>2:01.94</td>
                        <td>2.00</td>
                    </tr>
                    <tr>
                        <td>Rensselaer</td>
                        <td>2:03.40</td>
                        <td>–</td>
                    </tr>
                    <tr>
                        <td>Skidmore</td>
                        <td>2:07.65</td>
                        <td>–</td>
                    </tr>
                  </tbody>
                </Table>
            </div>

        </Container>
      </Container>      
    );
  }
}

export default(Event);
