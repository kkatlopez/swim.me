import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Form, Button, Row, Modal } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation.js";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Modify chat component for the edit chat page
class ModifyChat extends Component {
  constructor(props) {
	  super(props);
    this.members = [];
    this.state = {
      chatName: this.props.location.state.chatName,
      chatID: this.props.location.state.chatID,
      users: [],
      members: [],
      group: "",
      picture: this.props.location.state.chatIMG,
      userid: null,
      submittable: false,
      isubmittable: true,
      createsubmit: false,
      edittable: true,
      showModal: false,
      inputValue: ""
    }

    this.changePicture = this.changePicture.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.modifyChat = this.modifyChat.bind(this);
    this.deleteChat = this.deleteChat.bind(this);
    this.checkSubmittable = this.checkSubmittable.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setValue = this.setValue.bind(this);


    //BELOW IS THE CODE TO BLOCK OFF WHEN NOT LOGGED IN
    if(this.props.location.state === undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged === false){
      this.props.history.push("/", { logged: false });
    }
  }

  checkSubmittable = function(){
    var usernames = this.state.users.map(function(value,index) { return value.username; });
    if (this.state.userid === null && this.state.username !== "" && this.state.password !== "" && this.state.type_bool !== null) {
      this.setState({ createsubmit: true });
    }
    if (usernames.includes(this.state.username)) {
      this.setState({ createsubmit: false });
    } else {
      this.setState({ createsubmit: true });
    }
  }

  changePicture = (event) => {
    this.setState({picture: event.target.value}, () => this.checkSubmittable());
  }

  changeGroup = (event) => {
    this.setState({chatName: event.target.value}, () => this.checkSubmittable());
  }
  changeMembers = (value) => {
    this.members = value.map((person) => person.userID);
  }

  // sends post to server with the information from the page
  modifyChat = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:3001/modify_chat", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        members: this.members,
        name: this.state.chatName,
        picture: this.state.picture,
        chatID: this.state.chatID
      })

    })
      .then(
        (result) => {
          this.setState ({
            showModal: true
          });
          if (result.status !== 200) {
            this.setState({submittable: false});
            alert("error");
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  // same as modifyChat, but modifies the chat to have no users
  deleteChat = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:3001/modify_chat", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        members: [],
        name: this.state.chatName,
        picture: this.state.picture,
        chatID: this.state.chatID
      })

    })
      .then(
        (result) => {
          this.setState ({
            showModal: true
          });
          if (result.status !== 200) {
            this.setState({submittable: false});
            alert("error");
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  closeModal() {
    this.setState({
      showModal: false
    });
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/chat", { logged: true, admin: admin, user: user });
  }

  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/chat/" + this.props.location.state.chatID, { logged: logged, admin: admin, user: user, chatID: this.props.location.state.chatID, chatName: this.props.location.state.chatName} );
  }

  populatePage() {
    fetch("http://localhost:3001/user_info")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    fetch("http://localhost:3001/get_chat_users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatID: this.state.chatID
      }) }).then(res => res.json()).then(
        (result) => {
          this.setState( {
            members: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidMount() {
    var chat = this.props.match.params.chatID;
    this.setState({
        chatID: chat
    })
    this.populatePage();
  }

  setValue(val) {
    this.setState({
      members: val
    }, () => this.checkSubmittable())
  }

  setInputValue(val) {
    this.state.inputValue = val;
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">{this.state.chatName}</h1>
        </Container>
        <Container className="px-3">
          <a onClick={() => this.sendProps()} className="standalone">
            <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/>Back to Chat</p>
          </a>
          <h2 className="sectionTitle pb-4">Modify Chat</h2>
        </Container>
        <Container className="px-3" style={{ width: '95vw' }}>
        <Autocomplete
        multiple
        id="tags-filled"
        options={this.state.users}
        getOptionLabel={option => option.firstName + " " + option.lastName}
        getOptionSelected={(option, value) => {return (option.userID === value.userID);}}
        value={this.state.members}
        onChange={(_, newValue) => {
          this.setValue(newValue);
        }}
        freeSolo

        renderTags={(value, getTagProps) => {
          this.changeMembers(value);
          return value.map((option, index) => (
            <Chip variant="outlined" label={option.firstName + " " + option.lastName} {...getTagProps({ index })} />
          ));

        }
      }


        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Group Members"
            placeholder=""
          />
        )}
      /></Container>

        <Container className="px-4">
          <Form className="py-3" onSubmit={this.createUser}>
            <Form.Group as={Row} className="mb-3"mx-2>
              <Form.Label>Group Name</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={this.state.chatName}
                  onChange={this.changeGroup}
                  className="me-2"
                  disabled={!this.state.edittable}
                />
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"mx-2>
              <Form.Label>Group Picture</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={this.state.picture}
                  onChange={this.changePicture}
                  className="me-2"
                  disabled={!this.state.edittable}
                />
              </div>
            </Form.Group>

            <Container className="d-flex justify-content-center">
              <Button
                className="mx-3"
                as={Link}
                to={{pathname: "/chat", state: {logged: true, admin: this.props.location.state.admin, user: this.props.location.state.user}}}
                variant="secondary">
                  Cancel
              </Button>
              <Button className="mx-3" variant="danger" type="submit" onClick={this.deleteChat}>Delete Chat</Button>
              <Button className="mx-3" type="submit" disabled={!this.state.createsubmit} onClick={this.modifyChat}>Modify Chat</Button>
            </Container>
          </Form>
          {this.state.showModal &&
            <Modal show={this.state.showModal} onHide={this.closeModal} id="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title>Your changes have been saved!</Modal.Title>
              </Modal.Header>
              <Modal.Body>You have edited the group.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.closeModal}>
                  OK
                </Button>
              </Modal.Footer>
            </Modal>
            }
        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}



export default withRouter(ModifyChat);
