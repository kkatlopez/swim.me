
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card, Dropdown, Table } from 'react-bootstrap';
import '../css/meetresults.css';

class MeetCard extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
        name: this.props.meetname,
        date: this.props.meetdate
      }
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Card className="meet-card">
              <Card.Body className="mt-2">
                  <Card.Title>{this.state.name}</Card.Title>
                  <Card.Subtitle className="text-muted">{this.state.date}</Card.Subtitle>
                  <a href={"/meet/" + this.state.name} className="stretched-link"></a>
              </Card.Body>
            </Card>
      </Container>      
    );
  }
}

export default(MeetCard);
