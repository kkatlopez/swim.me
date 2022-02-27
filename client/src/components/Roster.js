import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Link, withRouter } from 'react-router-dom';
import { Navbar, Container, Alert, Card } from 'react-bootstrap';
// import '../css/frontpage.css';

class FrontPage extends Component {
	
  constructor(props) {
	super(props);
		
  }
	
  render() {
    return(
      <Container className="frontpage-main">
        <h1 className="front-title">TEST!</h1>
        <Alert variant="success">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Aww yeah, you successfully read this important alert message. This example
          text is going to run a bit longer so that you can see how spacing within an
          alert works with this kind of content.
        </p>
        <hr />
        <p className="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things nice
          and tidy.
        </p>
      </Alert>
      <Card body bg='danger'>This is some text within a card body.</Card>
      </Container>
      
    );
  }
}

export default(FrontPage);
