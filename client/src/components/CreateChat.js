import React, { Component } from 'react';
import { Container, Form, Button, Row, Modal } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation.js";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Create chat component for the new chat page
class CreateChat extends Component {
  constructor(props) {
	  super(props);
    this.members = [];
    this.state = {
      users: [],
      members: [],
      group: "",
      picture: "",
      userid: null,
      submittable: false,
      isubmittable: true,
      createsubmit: false,
      edittable: true,
      showModal: false
    }

    // updates the content of the form whenever there is a change:
    this.changePicture = this.changePicture.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
    this.createChat = this.createChat.bind(this);
    this.checkSubmittable = this.checkSubmittable.bind(this);
    this.closeModal = this.closeModal.bind(this);

    // redirect to login if not logged in
    if (this.props.location.state === undefined) {
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)) {
      this.props.history.push("/", { logged: false });
    }
    else if (this.props.location.state.logged === false) {
      this.props.history.push("/", { logged: false });
    }
  }

  // check if the form is submittable -- if there is no userid, username / password are empty, Submit button is disabled
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

  // following 4 functions are used to update the state of the form:
  changePicture = (event) => {
    this.setState({picture: event.target.value}, () => this.checkSubmittable());
  }

  changeGroup = (event) => {
    this.setState({group: event.target.value}, () => this.checkSubmittable());
  }
  changeMembers = (value) => {
    this.members = value.map((person) => person.userID);
  }

  createChat = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:3001/create_chat", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        members: this.members,
        name: this.state.group,
        picture: this.state.picture,
      })

    })
      .then(
        (result) => {
          this.setState ({
            showModal: true
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

  // used to close modal upon successful submission of alert
  closeModal() {
    this.setState({
      showModal: false
    });
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/chat", { logged: true, admin: admin, user: user });
  }

  // send props to other components
  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/chat", { logged: logged, admin: admin, user: user} );
  }

  // called to populate page with data from database
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
      )
  }

  // initialize component before rendering
  componentDidMount() {
    this.populatePage();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">New Chat</h1>
        </Container>
        <Container className="px-3">
          <a onClick={() => this.sendProps()} className="standalone">
            <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/>Back to Chats</p>
          </a>
          <h2 className="sectionTitle pb-4">New Chat</h2>
        </Container>
        <Container className="px-3" style={{ width: '95vw' }}>
        <Autocomplete
        multiple
        id="tags-filled"
        options={this.state.users}
        getOptionLabel={option => option.firstName + " " + option.lastName}
        getOptionSelected={(option, value) => {console.log(option); return (option.userID === value.userID);}}
        defaultValue={[]}
        freeSolo

        renderTags={(value, getTagProps) => {
          console.log(value);
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
                  value={this.state.group}
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
              <Button className="mx-3" type="submit" disabled={!this.state.createsubmit} onClick={this.createChat}>Create Chat</Button>
            </Container>
            {console.log(this.state.showModal)}
          </Form>
          {this.state.showModal &&
            <Modal show={this.state.showModal} onHide={this.closeModal} id="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title>Your changes have been saved!</Modal.Title>
              </Modal.Header>
              <Modal.Body>You have created a new group.</Modal.Body>
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

export default withRouter(CreateChat);
