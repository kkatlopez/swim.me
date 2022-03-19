import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card } from 'react-bootstrap';
import '../css/specificmeet.css';

class SpecificMeetCard extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
        name: this.props.eventname,
        link: this.props.eventlink,
        events: this.props.eventinfo,
        namelist: this.props.eventnamelist,
        first: ""
      }
  }

  componentDidMount(){
    var index = this.props.eventnameslist.indexOf(this.state.name);
    var eventinfo = this.state.events[index];
    var first = eventinfo[1][0][0] + " (" + eventinfo[1][0][1] + ")" ;
    this.setState({
        first: first
    })
  }

  render() {
    return(
        <Container fluid className="page-container">
            <Card className="event-card my-3">
                <Card.Body>
                    <Card.Title className="align-middle">{this.state.name}</Card.Title>
                    <Card.Text>Winner: {this.state.first}</Card.Text>
                    <a href={this.state.link} className="stretched-link"></a>
                </Card.Body>
            </Card>
        </Container>  
    );
  }
}

export default(SpecificMeetCard);
