import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import '../css/specificmeet.css';

class SpecificMeetCard extends Component {
	
  constructor(props) {
    super(props);

    // redirect to login if not logged in
    if(this.props.location.state === undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged === false){
      this.props.history.push("/", { logged: false });
    }

    this.state = {
      name: this.props.eventname,
      link: this.props.eventlink,
      events: this.props.eventinfo,
      namelist: this.props.eventnamelist,
      first: ""
    }
  }

  // initialize component before rendering
  componentDidMount(){
    var index = this.props.eventnameslist.indexOf(this.state.name);
    var eventinfo = this.state.events[index];
    var first = eventinfo[1][0][0] + " (" + eventinfo[1][0][1] + ")" ;
    this.setState({
        first: first
    })
  }

  // send props to other admin components
  sendProps(eventname) {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push(this.state.link, { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
        <Container fluid className="page-container">
            <Card className="event-card my-3">
                <Card.Body onClick={() => this.sendProps(this.state.name)} >
                    <Card.Title className="align-middle">{this.state.name}</Card.Title>
                    <Card.Text>Winner: {this.state.first}</Card.Text>
                </Card.Body>
            </Card>
        </Container>  
    );
  }
}

export default withRouter(SpecificMeetCard);
