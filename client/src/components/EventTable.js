
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Table } from 'react-bootstrap';
import '../css/event.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

class EventTable extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
        meetinfo: []
      }
  }

  //AJAX Calls
  populateEvent() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            meetinfo: result
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
	
  render() {
    this.populateEvent();
    return(
      <Container fluid className="page-container">
        <Container className="px-4">
            <div className="event">
                <h4>W 200 Medley Relay</h4>
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
            <a href="/" className="standalone text-end">
                <p className="text-right">View next event: M 200 Medley Relay <FontAwesomeIcon icon={faChevronRight} className="px-0"/></p>
            </a>
        </Container>
      </Container>      
    );
  }
}

export default(EventTable);
