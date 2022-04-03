import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
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

  sendProps(url) {
    var logged = this.props.logged;
    var admin = this.props.admin;
    var user = this.props.user;
    this.props.history.push(url, { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container>
        <Navbar bg="light" fixed="bottom">
            <Container>
                <Nav>
                  <Container className="d-flex justify-content-between icons">
                    <Nav.Link onClick={() => this.sendProps("/results")}><FontAwesomeIcon icon={faHome} className="fa-2x"/></Nav.Link>
                    <Nav.Link onClick={() => this.sendProps("/times")}><FontAwesomeIcon icon={faStopwatch} className="fa-2x"/></Nav.Link>
                    <Nav.Link onClick={() => this.sendProps("/roster")}><FontAwesomeIcon icon={faUserGroup} className="fa-2x"/></Nav.Link>
                    <Nav.Link onClick={() => this.sendProps("/calendar")}><FontAwesomeIcon icon={faBell} className="fa-2x"/></Nav.Link>
                    <Nav.Link onClick={() => this.sendProps("/chat")}><FontAwesomeIcon icon={faMessage} className="fa-2x"/></Nav.Link>
                  </Container>
                </Nav>
            </Container>
        </Navbar>
      </Container>
    );
  }
}

export default withRouter(Navigation);
