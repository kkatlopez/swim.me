import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Form, Button, Row, Modal } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation.js";

class AdminCreateUser extends Component {
  constructor(props) {
	  super(props);    
    this.state = {
      users: [],
      first: "",
      last: "",
      placeholderBody: "Please select a user",
      username: "",
      password: "",
      type: "Select user type",
      type_bool: null, // true === admin, false === swimmer
      // currentSelect: -1,
      userid: null,
      submittable: false,
      isubmittable: true,
      createsubmit: false,
      edittable: true,
      userTypes: ['Swimmer', 'Admin'],
      showModal: false
    }

    // this.changeUser = this.changeUser.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeFirst = this.changeFirst.bind(this);
    this.changeLast = this.changeLast.bind(this);
    this.changeType = this.changeType.bind(this);
    // this.updateUser = this.updateUser.bind(this);
    // this.deleteUser = this.deleteUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.checkSubmittable = this.checkSubmittable.bind(this);
    this.closeModal = this.closeModal.bind(this);


    //BELOW IS THE CODE TO BLOCK OFF WHEN NOT LOGGED IN
    if(this.props.location.state === undefined){
      this.props.history.push("/admin", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/admin", { logged: false });
    }
    else if(this.props.location.state.logged === false){
      this.props.history.push("/admin", { logged: false });
    }
    else if(this.props.location.state.admin === false){
      this.props.history.push("/", { logged: true });
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
  
  changeUsername = (event) => {
    this.setState({username: event.target.value}, () => this.checkSubmittable());
  }

  changePassword = (event) => {
    this.setState({password: event.target.value}, () => this.checkSubmittable());
  }

  changeFirst = (event) => {
    this.setState({first: event.target.value}, () => this.checkSubmittable());
  }

  changeLast = (event) => {
    this.setState({last: event.target.value}, () => this.checkSubmittable());
  }
  
  changeType = (event) => {
    if (event.target.value == "Admin") {
      this.setState({type: "Admin", type_bool: true}, () => this.checkSubmittable());
    } else {
      this.setState({type: "Swimmer", type_bool: false}, () => this.checkSubmittable());
    }
  }

  createUser = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:3001/add_user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: this.state.first,
        last: this.state.last,
        username: this.state.username,
        password: this.state.password,
        type_bool: this.state.type_bool,
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
          // if (result.status == 200) {
          //   this.props.history.push("/admin/", { logged: true });
          // }
          // else {
          //   
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
    this.props.history.push("/admin/", { logged: true });
  }

  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/admin", { logged: logged, admin: admin, user: user} );
  }

  populatePage() {
    fetch("http://localhost:3001/user_info")
      .then(res => res.json())
      .then(
        (result) => {
          // result.unshift({username: "Create a new user"});
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

  componentDidMount() {
    this.populatePage();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>        
        <Container className="px-3 dynamic-height">
          <a onClick={() => this.sendProps()} className="standalone">
            <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to Admin Dashboard</p>
          </a>
          <h2 className="sectionTitle">Modify User</h2>
        </Container>
        <Container className="px-4">
          <Form className="py-3" onSubmit={this.createUser}>
            <Form.Group as={Row} className="mb-3"mx-2>
              <Form.Label>First Name</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={this.state.first}
                  onChange={this.changeFirst}
                  className="me-2"
                  // isInvalid={!this.state.isubmittable}
                  disabled={!this.state.edittable}
                />
              </div>
            </Form.Group>

            <Form.Group as={Row} className="mb-3"mx-2>
              <Form.Label>Last Name</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={this.state.last}
                  onChange={this.changeLast}
                  className="me-2"
                  // isInvalid={!this.state.isubmittable}
                  disabled={!this.state.edittable}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3"mx-2>
              <Form.Label>Username</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  value={this.state.username}
                  onChange={this.changeUsername}
                  className="me-2"
                  isInvalid={!this.state.createsubmit && this.state.username !== ""}
                />
                <Form.Control.Feedback id="username_form" type="invalid">
                  This username already exists.
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            {this.state.edittable &&
              <Form.Group as={Row} className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="password"
                    value={this.state.password}
                    onChange={this.changePassword}
                    className="me-2"
                    // isInvalid={!this.state.isubmittable}
                  />
                </div>
             </Form.Group>
            }
            
            <Form.Group as={Row} className="mb-3"mx-2>
              <Form.Label>User Type</Form.Label>
                <div className="px-3">
                  {
                    this.state.userTypes.map( (item) => {
                      return(
                        <Form.Check
                          type="radio"
                          label={item}
                          name="userType"
                          value={item}
                          onChange={this.changeType}
                          className="me-2"
                          // isInvalid={!this.state.isubmittable}
                          // disabled={!this.state.edittable}
                        />
                      )
                    })
                  }
                </div>
            </Form.Group>
            
            <Container className="d-flex justify-content-center">
              <Button
                className="mx-3"
                as={Link}
                to={{pathname: "/admin", state: {logged: true}}}
                variant="secondary">
                  Cancel
              </Button>
              <Button className="mx-3" type="submit" disabled={!this.state.createsubmit} onClick={this.createUser}>Create User</Button>
            </Container>
            {console.log(this.state.showModal)}
          </Form>
          {this.state.showModal &&
            <Modal show={this.state.showModal} onHide={this.closeModal} id="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title>Your changes have been saved!</Modal.Title>
              </Modal.Header>
              <Modal.Body>You have added a new user.</Modal.Body>
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

export default withRouter(AdminCreateUser);