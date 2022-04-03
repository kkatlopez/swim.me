import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/meetresults.css';

class MeetCard extends Component {
	
  constructor(props) {
    super(props);
    // if(this.props.location.state == undefined){
    //   this.props.history.push("/", { logged: false });
    // }
    // else if (!('logged' in this.props.location.state)){
    //   this.props.history.push("/", { logged: false });
    // }
    // else if(this.props.location.state.logged == false){
    //   this.props.history.push("/", { logged: false });
    // }

    this.state = {
      name: this.props.meetname,
      date: this.props.meetdate,
      ogdate: this.props.meetoriginaldate
    }
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Card className="meet-card">
          <Card.Body className="mt-2">
              <Card.Title>{this.state.name}</Card.Title>
              <Card.Subtitle className="text-muted">{this.state.date}</Card.Subtitle>
              <a href={"/meet/" + this.state.name + "_" + this.state.ogdate} 
              // logged={this.props.location.state.logged} 
              // admin={this.props.location.state.admin} 
              // user={this.props.location.state.user}
              meetname={this.state.name} meetdate={this.state.meetdate} className="stretched-link"></a>
          </Card.Body>
        </Card>
      </Container>      
    );
  }
}

export default (MeetCard);
