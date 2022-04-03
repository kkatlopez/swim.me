import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import '../css/specificmeet.css';

class SpecificMeetCard extends Component {
	
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
                    <a href={this.state.link} 
                    // logged={this.props.location.state.logged} 
                    // admin={this.props.location.state.admin}
                    // user={this.props.location.state.user}
                    className="stretched-link"></a>
                </Card.Body>
            </Card>
        </Container>  
    );
  }
}

export default (SpecificMeetCard);