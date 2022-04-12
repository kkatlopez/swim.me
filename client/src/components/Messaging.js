import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Card } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/messaging.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ChatCard from "./ChatCard.js";
import Navigation from "./Navigation.js";
import moment from 'moment';

class Messaging extends Component {

  constructor(props) {
    super(props);
    if(this.props.location.state == undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged == false){
      this.props.history.push("/", { logged: false });
    }
    this.state = {
      chatlist: [],
      logged: this.props.location.state.logged,
      admin: this.props.location.state.admin,
      user: this.props.location.state.user
    }
  }

  //AJAX Calls
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
    // this.setState({
    //   chatlist: [{chatName: "Matthew", chatID: 1, chatIMG: "https://rpiathletics.com/images/2021/10/5/Youngbar_Matthew.jpg", lastMessage: "What are you up to?"}, {chatName: "Gwyenth", chatID: 2, chatIMG: "https://rpiathletics.com/images/2021/10/5/Yuen_Gwyneth.jpg", lastMessage:"hmm, idk"}]
    // });
  }

  componentDidMount(){
    this.populateChats();
  }

  // sendProps(lister) {
  //   var logged = this.props.location.state.logged;
  //   var admin = this.props.location.state.adin
  //   var user = this.props.location.state.user;
  //   // this.props.history.push("/meet/"+ lister.meetName + "_" + lister.meetStartDate, { logged: logged, admin: admin, user: user} );
  // }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Chat</h1>
        </Container>
        <Container className="px-4">
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
