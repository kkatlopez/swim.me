import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import '../css/specificmeet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class FrontPage extends Component {
	
  constructor(props) {
	super(props);
		
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Meet Results</h1>
        </Container>
        <Container className="px-4">
            <a href="/" className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to all meets</p>
            </a>
            <h2>RPI @ Skidmore</h2>
            <p class="text-muted">January 22, 2022</p>
            <label>Event</label>
            <DropdownButton className="dropdown pb-3" title="Select an event">
                <Dropdown.Item href="#/action-1">W 200 Medley Relay</Dropdown.Item>
                <Dropdown.Item href="#/action-2">M 200 Medley Relay</Dropdown.Item>
                <Dropdown.Item href="#/action-3">W 1000 Free</Dropdown.Item>
                <Dropdown.Item href="#/action-3">M 1000 Free</Dropdown.Item>
            </DropdownButton>
            <div className="events">
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
                        </tbody>
                    </Table>
                    <a href="" className="standalone view-all">
                        <p>View all results<FontAwesomeIcon icon={faChevronRight} /></p>
                    </a>
                </div>
                <div className="event">
                    <h4>M 200 Medley Relay</h4>
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
                                <td>1:38.51</td>
                                <td>11.00</td>
                            </tr>
                            <tr>
                                <td>Rensselaer</td>
                                <td>1:39.06</td>
                                <td>4.00</td>
                            </tr>
                            <tr>
                                <td>Skidmore</td>
                                <td>1:42.74</td>
                                <td>2.00</td>
                            </tr>
                        </tbody>
                    </Table>
                    <a href="" className="standalone view-all">
                        <p>View all results<FontAwesomeIcon icon={faChevronRight} /></p>
                    </a>
                </div>
            </div>
            
        </Container>
      </Container>      
    );
  }
}

export default(FrontPage);
