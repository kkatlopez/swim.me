import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Link, withRouter } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import '../css/frontpage.css';

class FrontPage extends Component {
	
  constructor(props) {
	super(props);
		
  }
	
  render() {
    return(
      <Container className="frontpage-main">
        <h1 className="front-title">Welcome!</h1>
      </Container>
    );
  }
}

export default(FrontPage);
