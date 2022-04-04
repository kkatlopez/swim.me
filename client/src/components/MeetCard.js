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

  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/meet/"+ this.state.name + "_" + this.state.ogdate, { logged: logged, admin: admin, user: user} );
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Card className="meet-card">
          <Card.Body className="mt-2" meetname={this.state.name} startdate={this.state.date} onClick={() => this.sendProps()} >
              <Card.Title>{this.state.name}</Card.Title>
              <Card.Subtitle className="text-muted">{this.state.date}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Container>       
    );
  }
}

export default withRouter(MeetCard);
