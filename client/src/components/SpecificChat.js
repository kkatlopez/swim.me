import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Form, ToastContainer, Toast } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/specificchat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SpecificMeetCard from './SpecificMeetCard';
import Navigation from "./Navigation.js";
import moment from 'moment';

class SpecificChat extends Component {

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
      chatID: 0,
      messages: [],
      logged: this.props.location.state.logged,
      admin: this.props.location.state.admin,
      user: this.props.location.state.user
    }
  }

  populateMessages() {
    // fetch("http://localhost:3001/get_messages", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // })
    //   .then(res => res.json())
    //   .then(
    //       (result) => {
    //         console.log(result);
    //         this.setState({
    //           messages: result,
    //         });
    //       },
    //       (error) => {
    //         this.setState({
    //           isLoaded: true,
    //           error
    //         });
    //     }
    //   )
    this.setState({
      messages: [{sender: "Matthew", senderIMG: "https://rpiathletics.com/images/2021/10/5/Youngbar_Matthew.jpg", messageBody: "Hey how are you?", timestamp: "1:00 PM"}, {sender: "Gwyneth", senderIMG: "https://rpiathletics.com/images/2021/10/5/Yuen_Gwyneth.jpg", messageBody: "I'm good!", timestamp: "1:01 PM"}]
    });
  }

  componentDidMount(){
    var chat = this.props.match.params.chatID;
    this.setState({
        chatID: chat
    })
    console.log(chat);
    this.populateMessages();
  }

  sendProps(eventname) {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/meet/" + this.state.meetname + "_" + this.state.meetdate + "/event/" + eventname, { logged: logged, admin: admin, user: user} );
  }

  backToAllChats() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/chat", { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Meet Results</h1>
        </Container>
        <Container className="px-4">
            {/* <a href="/results" className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to all meets</p>
            </a> */}
            <a onClick={() => this.backToAllChats()} className="standalone meet-link">
              <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/>Back to all chats</p>
            </a>
            <div
            aria-live="polite"
            aria-atomic="true"
            className="bg-dark position-relative"
            style={{ minHeight: '240px' }}
            className="chat-bubbles"
            >
            <ToastContainer className="p-3" >
            {
              this.state.messages.map( (lister) => {
                  return(<Toast>
                    <Toast.Header closeButton={false}>
                      <img
                        src={lister.senderIMG}
                        className="rounded me-2 profile-image"
                        alt=""
                      />
                      <strong className="me-auto">{lister.sender}</strong>
                      <small>{lister.timestamp}</small>
                    </Toast.Header>
                    <Toast.Body>{lister.messageBody}</Toast.Body>
                  </Toast>)
              })
            }

            </ToastContainer>
          </div>

            <div >

            </div>

        </Container>
        <div class="navbar fixed-bottom">
          <Form style={{width:"95%"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{padding:"0 0 0 1.5vh"}}>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
          <FontAwesomeIcon icon={faArrowUp} className="fa-solid"/>
        </div>
      </Container>
    );
  }
}
// <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>

export default withRouter(SpecificChat);