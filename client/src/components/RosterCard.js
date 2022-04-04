import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Link, withRouter } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/roster.css';

class RosterCard extends Component {
	
    constructor(props) {
      super(props);
      this.state = {
          firstname: this.props.first,
          lastname: this.props.last,
          year: this.props.year,
          hs: this.props.hs,
          hometown: this.props.hometown,
          strokes: this.props.strokes
        }
    }
    sendProps() {
      var logged = this.props.location.state.logged;
      var admin = this.props.location.state.adin
      var user = this.props.location.state.user;
      this.props.history.push("/roster/"+ this.state.firstname + "/" + this.state.lastname, { logged: logged, admin: admin, user: user} );
    }
      
    render() {
      return(
        <Card className="prof-card">
            <Card.Body className="mt-2" firstname={this.state.firstname} lastname={this.state.lastname} year={this.state.year} hs={this.state.hs} hometown={this.state.hometown} stroke={this.state.strokes} onClick={() => this.sendProps()}>
                <Card.Img variant="top" src="https://picsum.photos/300" />
                <Card.Title className="mt-2">{this.state.firstname} {this.state.lastname}</Card.Title>
                {/* <a href={"/roster/" + this.state.firstname + "-" + this.state.lastname} className="stretched-link"></a> */}
                <Card.Text>
                  <div>{this.state.strokes}</div>
                  <div>{this.state.year}</div>
                  <div>{this.state.hometown}</div>
                </Card.Text>
            </Card.Body>
        </Card>
      );
    }
  }
  
  export default withRouter(RosterCard);
  