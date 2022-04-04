import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/messaging.css';

class ChatCard extends Component {

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
      name: this.props.chatname,
      chatID: this.props.chatID,
      chatIMG: this.props.chatIMG,
      lastMessage: this.props.lastMessage
    }
    console.log(this.state.name);
  }

  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/chat/" + this.state.chatID, { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Card className="chat-card">
          <Card.Body className="mt-2" meetname={this.state.name} startdate={this.state.date} onClick={() => this.sendProps()} >
              <img src={this.state.chatIMG} className="chat-img" />
              <Card.Title>{this.state.name}</Card.Title>
              <Card.Subtitle className="text-muted">{this.state.lastMessage}</Card.Subtitle>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default withRouter(ChatCard);
