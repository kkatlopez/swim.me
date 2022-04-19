import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/messaging.css';

class ChatCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.chatname,
      chatID: this.props.chatID,
      chatIMG: this.props.chatIMG,
      lastMessage: this.props.lastMessage
    }
  }

  // send props to other components
  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/chat/" + this.state.chatID, { logged: logged, admin: admin, user: user, chatID: this.state.chatID, chatName: this.state.name, chatIMG: this.state.chatIMG} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Card className="chat-card py-2">
          <div className="row no-gutters d-flex align-items-center">
            <div className="col-xl-1 col-lg-2 col-3 ml-5">
              <img src={this.state.chatIMG} alt="avatar" className="card-img chat-img my-auto" />
            </div>
            <div className="col">
              <Card.Body className="mt-2" startdate={this.state.date} onClick={() => this.sendProps()} >
              <Card.Title>{this.state.name}</Card.Title>
              <Card.Subtitle className="text-muted">{this.state.lastMessage}</Card.Subtitle>
          </Card.Body>
            </div>
          </div>

        </Card>
      </Container>
    );
  }
}

export default withRouter(ChatCard);
