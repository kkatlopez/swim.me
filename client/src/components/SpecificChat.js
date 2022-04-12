import React, { Component, useContext, useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Form, ToastContainer, Toast } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/specificchat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import SpecificMeetCard from './SpecificMeetCard';
import Navigation from "./Navigation.js";
import moment from 'moment';
import {SocketContext} from '../context/socket';

function Messages(props) {
  const socket = useContext(SocketContext);
  const mes = props.messages;
  const user = props.user;
  const chatID = props.chatID;
  // console.log(mes);
  const [messages, setMessages] = useState([]);
  // console.log(messages);
  const allNotes = props.messages;
  useEffect(() => {
        if(allNotes.length > 0) {
          setMessages(allNotes);
      }
      socket.on(user, data => {
        // console.log("hey");
        // const newData = JSON.parse(data);
        if (data.chatID == chatID) {
          setMessages(oldArray => [...oldArray, data]);
        }
      })
      return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off(user);
    };
  }, [allNotes, socket, user]);
  // setMessages(oldArray => props.messages);

  // messages = props.messages;
  // this.state
  // constructor(props) {
	//   super(props);
  //   this.state = {
  //     messages: props.messages
  //   }
  // }
  // newMessage(data) {
  //   const newData = JSON.parse(data);
  //   this.setState(prevState => ({messages: [...prevState.messages, newData]}));
  // };
  // console.log(props.user);

  return <ToastContainer className="p-3" >
  {
    messages.map( (lister) => {
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

  </ToastContainer>;
}

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
      chatID: this.props.location.state.chatID,
      messages: [],
      message: "",
      logged: this.props.location.state.logged,
      admin: this.props.location.state.admin,
      user: this.props.location.state.user
    }
  }

  populateMessages() {
    fetch("http://localhost:3001/get_messages", {
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
              messages: result,
            });
          },
          (error) => {
            console.log(error);
            this.setState({
              isLoaded: true,
              error
            });
        }
      )
    // this.setState({
    //   messages: [{sender: "Matthew", senderIMG: "https://rpiathletics.com/images/2021/10/5/Youngbar_Matthew.jpg",
    //   messageBody: "Hey how are you?", timestamp: "1:00 PM"}, {sender: "Gwyneth", senderIMG: "https://rpiathletics.com/images/2021/10/5/Yuen_Gwyneth.jpg",
    //   messageBody: "I'm good!", timestamp: "1:01 PM"}]
    // });
  }

  componentDidMount(){
    var chat = this.props.match.params.chatID;
    this.setState({
        chatID: chat
    })
    console.log(chat);
    this.populateMessages();
    console.log(process.env.REACT_APP_API_KEY);

  }

  changeMessage = (event) => {
    this.setState({message: event.target.value}); //, () => this.checkSubmittable()
  }

  sendProps(eventname) {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/meet/" + this.state.meetname + "_" + this.state.meetdate + "/event/" + eventname, { logged: logged, admin: admin, user: user} );
  }

  backToAllChats() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/chat", { logged: logged, admin: admin, user: user} );
  }

  sendMessage() {
    fetch("http://localhost:3001/send_message", {
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
              messages: result,
            });
          },
          (error) => {
            console.log(error);
            this.setState({
              isLoaded: true,
              error
            });
        }
      )
      var elem = this.refs.textarea;
      elem.value = "";
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Chat</h1>
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

            <Messages user = {this.state.user} messages = {this.state.messages} chatID = {this.state.chatID}/>

          </div>

            <div >

            </div>

        </Container>
        <div class="navbar fixed-bottom">
          <Form style={{width:"95%"}}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{padding:"0 0 0 1.5vh"}}>
              <Form.Control as="textarea" ref="textarea" rows={3} onChange={this.changeMessage} onKeyPress={event => {if (event.key === "Enter") {this.sendMessage();}}}/>
            </Form.Group>
          </Form>
          <div className="send-button" onClick={() => this.sendMessage()}>
            <FontAwesomeIcon icon={faArrowUp} className="fa-solid" />
          </div>
        </div>
      </Container>
    );
  }
}
// <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>

export default withRouter(SpecificChat);
