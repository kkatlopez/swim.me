import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import '../css/meetresults.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

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
            {/* <a href="/" className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to all meets</p>
            </a> */}
          <label>Meet</label>
          <DropdownButton className="dropdown pb-3" title="Select a meet">
            <Dropdown.Item href="/meet">RPI @ Skidmore</Dropdown.Item>
            <Dropdown.Item href="#/action-2">MIT Invitational</Dropdown.Item>
            <Dropdown.Item href="#/action-3">RPI vs. Vassar College</Dropdown.Item>
          </DropdownButton>
          <h2>Latest Results</h2>
          <div className="meet-cards">
            <Card className="meet-card">
              <Card.Body className="mt-2">
                  <Card.Title>RPI @ Skidmore</Card.Title>
                  <Card.Subtitle className="text-muted">January 22, 2022</Card.Subtitle>
                  <a href="/meet" className="stretched-link"></a>
              </Card.Body>
            </Card>
            <Card className="meet-card">
              <Card.Body className="mt-2">
                <Card.Title>MIT Invitational</Card.Title>
                <Card.Subtitle className="text-muted">December 3, 2022</Card.Subtitle>
                {/* <FontAwesomeIcon icon={faArrowRight} className="fa"/> */}
              </Card.Body>
            </Card>
            <Card className="meet-card">
              <Card.Body className="mt-2">
                <Card.Title>RPI vs. Vassar College</Card.Title>
                <Card.Subtitle className="text-muted">November 13, 2021</Card.Subtitle>
                {/* <FontAwesomeIcon icon={faArrowRight} className="fa-landing"/> */}
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Container>      
    );
  }
}

export default(FrontPage);
