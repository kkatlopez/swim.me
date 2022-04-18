import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/meetresults.css';

class MeetCard extends Component {
	
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.meetname,
      date: this.props.meetdate,
      ogdate: this.props.meetoriginaldate
    }
  }

  // send props to other admin components
  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/meet/"+ this.state.name + "_" + this.state.ogdate, { logged: logged, admin: admin, user: user} );
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Card className="meet-card">
          <Card.Body meetname={this.state.name} startdate={this.state.date} onClick={() => this.sendProps()} >
              <div className="inner align-items-center">
                <Card.Title className="meet-name">{this.state.name}</Card.Title>
                <Card.Subtitle className="text-muted">{this.state.date}</Card.Subtitle>
              </div>
          </Card.Body>
        </Card>
      </Container>       
    );
  }
}

export default withRouter(MeetCard);
