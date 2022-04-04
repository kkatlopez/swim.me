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
      type: "Select user type",
      type_bool: null,
      currentSelect: -1,
      userid: null,
      submittable: false,
      isubmittable: true,
      createsubmit: false
    }

    this.changeUser = this.changeUser.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeType = this.changeType.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.checkSubmittable = this.checkSubmittable.bind(this);

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

  checkSubmittable = function(){
    // console.log(this.state.users[this.state.users.length-1].userID + 1);
    if (this.state.userid == null &&
      this.state.currentSelect == "CREATE A NEW USER" &&
      this.state.username != "Enter a username" &&
        this.state.password != "Enter a password" &&
        this.state.type != "Select user type" && this.state.submittable == true) {
          this.setState({createsubmit: true, userid: this.state.users[this.state.users.length-1].userID + 1});
    }
    else if (this.state.username == "Please select a user" ||
        this.state.password == "Please select a user" ||
        this.state.type == "Select user type" ||
        this.state.userid == null ||
        this.state.currentSelect == -1) {
      this.setState({submittable: false, createsubmit: false});
    }
    else{
      this.setState({submittable: true});
    }
  }
  
  changeUser = (event) =>{	
    if(event.target.value == "Please select a user"){
        var temp = this.state.placeholderBody;
        this.setState({
          currentSelect: -1,
          username: temp,
          password: temp,
          type: temp,
          type_bool: temp,
          userid: null,
          createsubmit: false,
          submittable: false,
        });
      } else{
        var selected = event.target.value;
        if(selected == "CREATE A NEW USER") {
          this.setState ({
            currentSelect: event.target.value,
            username: "Enter a username",
            password: "Enter a password",
            type: "Select user type",
            type_bool: "Select user type",
            userid: null,
            isubmittable: true,
            submittable: false,
            createsubmit: false
          });
        }

        else {
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
            userid: this.state.users[temp].userID,
            isubmittable: true,
            submittable: true,
            createsubmit: false
          });
        }

      }
	}
  
  changeUsername = (event) => {
    // if (this.state.currentSelect != -1) {
    //   this.setState({username: event.target.value})
    // };

    // if (this.state.currentSelect != -1) {
    // console.log(this.state.users.find({username: event.target.value}))
    var usernames = this.state.users.map(function(value,index) { return value.username; });
    // console.log(usernames);
    this.setState({username: event.target.value});
    if(usernames.includes(event.target.value)) {
      this.setState({isubmittable: false});
    }
    else {
      this.setState({submittable: true});
    }
    this.checkSubmittable();
  }

  changePassword = (event) => {
    // if(this.state.currentSelect != -1){this.setState({password: event.target.value})};
    this.setState({password: event.target.value});
    // };
    this.checkSubmittable();
  }
  
  changeType = (event) => {
    // if(this.state.currentSelect != -1){
    //   if(event.target.value == "Admin") {
    //     this.setState({type: "Admin", type_bool: true});
    //   }
    //   else {
    //     this.setState({type: "Swimmer", type_bool: false});
    //   }
    // }

    if(event.target.value == "Admin") {
      this.setState({type: "Admin", type_bool: true});
    }
    else {
      this.setState({type: "Swimmer", type_bool: false});
    }
    this.checkSubmittable();
  }

  deleteUser = function () {
    fetch("http://localhost:3001/delete_user", {
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

  createUser = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({userID: this.state.users[this.state.users.length-1].userID + 1});
    fetch("http://localhost:3001/add_user", {
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
          result.unshift({username: "CREATE A NEW USER"});
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
              isInvalid={!this.state.isubmittable}
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
                isInvalid={!this.state.isubmittable}
              />

              <Form.Control.Feedback id="username_form" type="invalid">
                This username already exists.
              </Form.Control.Feedback>
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
                isInvalid={!this.state.isubmittable}
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
                isInvalid={!this.state.isubmittable}
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
            <Button onClick={this.createUser} className={"green-button " + (this.state.createsubmit ? "" : "disabled")} disabled={!this.state.createsubmit}>Create</Button>
            <Button onClick={this.deleteUser} className={"green-button " + (this.state.submittable ? "" : "disabled")} disabled={!this.state.submittable}>Delete</Button>
            <Button type="submit" className={"green-button " + (this.state.submittable ? "" : "disabled")} disabled={!this.state.submittable}>Edit</Button>
          </div>
        </Form>
        
      </Container>
    );
  }
}

export default withRouter(AdminModifyUser);