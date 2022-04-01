import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStopwatch, faUserGroup, faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import '../css/navigation.css';

class Navigation extends Component {
  constructor(props) {
	super(props);
    this.state = {
        
    };
  }

  render() {
    return(
      <Container>
        <Navbar bg="light" fixed="bottom">
            <Container>
                <Nav>
                  <Container className="d-flex justify-content-between icons">
                    <Nav.Link href="/"><FontAwesomeIcon icon={faHome} className="fa-2x"/></Nav.Link>
                    <Nav.Link href="/times"><FontAwesomeIcon icon={faStopwatch} className="fa-2x"/></Nav.Link>
                    <Nav.Link href="/roster"><FontAwesomeIcon icon={faUserGroup} className="fa-2x"/></Nav.Link>
                    <Nav.Link href="/calendar"><FontAwesomeIcon icon={faBell} className="fa-2x"/></Nav.Link>
                    <Nav.Link href="/chat"><FontAwesomeIcon icon={faMessage} className="fa-2x"/></Nav.Link>
                  </Container>
                </Nav>
            </Container>
        </Navbar>
      </Container>      
    );
  }
}

export default(Navigation);
