import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Form, Button, Row } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class AdminModifyUser extends Component {
  constructor(props) {
	  super(props);    
    this.state = {
      users: [],
      placeholderBody: "Please select a user",
      username: "Please select a user",
      password: "Please select a user",
      type: "Please select a user",
      type_bool: false,
      currentSelect: -1,
      userid: null
    }

    this.changeUser = this.changeUser.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeType = this.changeType.bind(this);
    this.updateUser = this.updateUser.bind(this);

    //BELOW IS THE CODE TO BLOCK OFF WHEN NOT LOGGED IN
    // if(this.props.location.state == undefined){
    //   this.props.history.push("/admin", { logged: false });
    // }
    // else if (!('logged' in this.props.location.state)){
    //   this.props.history.push("/admin", { logged: false });
    // }
    // else if(this.props.location.state.logged == false){
    //   this.props.history.push("/admin", { logged: false });
    // }
  }
  
  changeUser = (event) =>{	
    if(event.target.value == "Please select a user"){
        var temp = this.state.placeholderBody;
        this.setState({
          currentSelect: -1,
          username: temp,
          password: temp,
          type: temp,
          type_bool: false,
          userid: null
        });
      } else{
        var selected = event.target.value;
        var temp = this.state.users.findIndex(record => record.username == selected);
        var new_type;
        if(this.state.users[temp].admin == true) {
          new_type = "Admin"
        } else {
          new_type = "Swimmer"
        }
        
        this.setState ({
          currentSelect: event.target.value,
          username: this.state.users[temp].username,
          password: this.state.users[temp].password,
          type: new_type,
          type_bool: this.state.users[temp].admin,
          userid: this.state.users[temp].userID
        });
      }
	}
  
  changeUsername = (event) => {
    if (this.state.currentSelect != -1) {this.setState({username: event.target.value})};
  }

  changePassword = (event) => {
    if(this.state.currentSelect != -1){this.setState({password: event.target.value})};
  }
  
  changeType = (event) => {
    if(this.state.currentSelect != -1){
      if(event.target.value == "Admin") {
        this.setState({type: "Admin", type_bool: true});
      }
      else {
        this.setState({type: "Swimmer", type_bool: false});
      }
    }
  }
  
  updateUser = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:3001/edit_user_info", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(
        (result) => {
          if (result.status == 200) {
            this.props.history.push("/admin/", { logged: true });
          }
          else {
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

  componentDidMount() {
    this.populatePage();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Row className="px-3">
          <h2>Modify User</h2>
        </Row>
        <a href="/admin" className="standalone">
          <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to Admin Dashboard</p>
        </a>
        <Form className="pb-3" onSubmit={this.updateUser}>
          <Form.Group  as={Row} className="mb-3">
            <Form.Label><h4>Select a User</h4></Form.Label>
            <Form.Select
              aria-label="Select which user to modify"
              value={this.state.currentSelect}
              onChange={this.changeUser}
              className="me-2"
            >
              <option value="Select a user">Select a user</option>
              {
                this.state.users.map( (item) => {
                  return(<option value={item.username}>{item.username}</option>)
                })
              }
            </Form.Select>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="form.Text">
            <Form.Label>Username</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                value={this.state.username}
                onChange={this.changeUsername}
                className="me-2"
              />
            </div>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3" controlId="form.Text">
            <Form.Label>Password</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="password"
                value={this.state.password}
                onChange={this.changePassword}
                className="me-2"
              />
            </div>
          </Form.Group>
          
          <Form.Group as={Row} className="mb-3" controlId="form.Text">
            <Form.Label>User Type</Form.Label>
            <div className="d-flex">
              <Form.Select
                aria-label="Select a user type"
                placeholder="Select a user type"
                value={this.state.type}
                onChange={this.changeType}
                className="me-2"
              >
                <option>Select user type</option>
                <option value="Admin">Admin</option>
                <option value="Swimmer">Swimmer</option>
              </Form.Select>
            </div>
          </Form.Group>
          
          <div className="admin-submit-btn-panel">
            <Button
              as={Link}
              to={{pathname: "/admin", state: {logged: true}}}
              className="gray-button">
                Cancel
            </Button>
            {/* <Button className="green-button admin-submit-btn">Delete</Button> */}
            <Button type="submit" className="green-button admin-submit-btn">Submit</Button>
          </div>
        </Form>
        
      </Container>
    );
  }
}

export default withRouter(AdminModifyUser);