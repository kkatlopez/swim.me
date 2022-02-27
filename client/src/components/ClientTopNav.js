import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../css/navbarclient.css';

class ClientTopBar extends Component {
	
  constructor(props) {
	super(props);
    //let self = this;
    if (this.props.page == "front"){
      var f = true;
      var m = false;
      var li = false;
      var sec = false;
    }else if (this.props.page == "map"){
      var f = false;
      var m = true;
      var li = false;
      var sec = false;
    }else if (this.props.page == "list"){
      var f = false;
      var m = false;
      var li = true;
      var sec = false;
    }else if (this.props.page == "sec"){
      var f = false;
      var m = false;
      var li = false;
      var sec = true;
    }
    this.state = {
      onFront: f,
      onMap: m,
      onList: li,
      onSec: sec
    }
  }
  
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    if (this.props.page !== prevProps.page) {
      if (this.props.page == "front"){
        var f = true;
        var m = false;
        var li = false;
        var sec = false;
      }else if (this.props.page == "map"){
        var f = false;
        var m = true;
        var li = false;
        var sec = false;
      }else if (this.props.page == "list"){
        var f = false;
        var m = false;
        var li = true;
        var sec = false;
      }else if (this.props.page == "sec"){
        var f = false;
        var m = false;
        var li = false;
        var sec = true;
      }
      this.setState({
        onFront: f,
        onMap: m,
        onList: li,
        onSec: sec
      })
    }
  }
  
  /*
  
  
  
  */
	
  render() {
    return(
      <Navbar id="client-top-bar" className="main-nav main-client-nav" expand="lg" bg="dark">
        <Container id="navbar-full-container">
          <Navbar.Brand as={Link} className={"navlinks " + (this.state.onFront ? "cur-page" : "")} to="/">Site Title</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="client-top-collapse">
            <Nav className="me-auto client-nav-links">
              <Nav.Link as={Link} to="/" className={"navlinks navpagelinks not-title-navlink " + (this.state.onMap ? "cur-page" : "")}>Home</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default(ClientTopBar);

//export default withRouter(ClientTopBar);