import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/messaging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import ChatCard from "./ChatCard.js";
import Navigation from "./Navigation.js";

class Messaging extends Component {

  constructor(props) {
    super(props);
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
      chatlist: [],
      logged: this.props.location.state.logged,
      admin: this.props.location.state.admin,
      user: this.props.location.state.user
    }
  }

  // retrive all chats
  populateChats() {
    fetch("http://localhost:3001/chats", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            chatlist: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  // initialize component before rendering
  componentDidMount(){
    this.populateChats();
  }

  // send props to other admin components
  sendPropsNewChat() {
    var logged = this.state.logged;
    var admin = this.state.admin;
    var user = this.state.user;
    this.props.history.push("/newChat", { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end justify-content-between">
          <h1 className="siteHeaderTitle px-3 mb-3">Chat</h1>
          <Button className="mb-3" onClick={() => this.sendPropsNewChat()}>
          <FontAwesomeIcon icon={faMessage} className="new-group fa-xl"/>
          New Chat
          </Button>
        </Container>
        <Container className="px-4 dynamic-height">
        <div className="chat-card">
          {
            this.state.chatlist.map( (lister) => {
                return(<ChatCard chatname={lister.chatName} chatID={lister.chatID} chatIMG={lister.chatIMG} lastMessage={lister.lastMessage}
                logged={this.props.location.state.logged}
                admin={this.props.location.state.admin}
                user={this.props.location.state.user}
                />)
            })
          }

        </div>
        </Container>

        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}

export default withRouter(Messaging);
