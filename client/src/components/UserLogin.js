import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button, FloatingLabel} from 'react-bootstrap';

class UserLanding extends Component {

  constructor(props) {
	super(props);
    this.state = {
      user: "",
      pass: "",
      submittable: false,
      isubmittable: true,
      fakeUser: "root",
      fakePass: "root"
    }

    // updates the content of the form whenever there is a change:
    this.changeUser = this.changeUser.bind(this);
    this.changePass = this.changePass.bind(this);
    this.confirmCreds = this.confirmCreds.bind(this);

    // redirect to login if not logged in
    if (this.props.location.state !== undefined && this.props.location.state.logged){
      this.props.history.push("/results", this.props.location.state);
    }

  }

  // check if login fields are filled in
  checkSubmittable = function(){
    if (this.state.user.trim() === "" || this.state.pass.trim() === ""){
      this.setState({submittable: false});
    } else {
      this.setState({submittable: true});
    }
  }

  // verify user's login credentials
  confirmCreds = function () {
    fetch("http://localhost:3001/verify_credentials", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(
        (result) => {
          if (result.Result === true) {
            this.props.history.push("/results", { logged: true, admin: result.Admin, user: result.User});
          }
          else{
            this.setState({
              user: "",
              pass: "",
              isubmittable: false,
            });
            this.checkSubmittable();
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

  // change and check the username field dynamically
  changeUser = (event) => {
    this.setState({user: event.target.value});
    this.checkSubmittable();
  }

  // change and check the password field dynamically
  changePass = (event) => {
    this.setState({pass: event.target.value});
    this.checkSubmittable();
  }

  render() {
    return(
        <Container fluid className="page-container">
          <Container fluid className="siteHeader d-flex align-items-end">
            <h1 className="siteHeaderTitle px-3 mb-3">Log in</h1>
          </Container>
          <Container className="px-4 pt-3">
            <Form>
            <Form.Group>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
                value={this.state.user}
                onChange={this.changeUser}
                isInvalid={!this.state.isubmittable}
              >
                <Form.Control type="text" placeholder="Username" value={this.state.user} onChange={this.changeUser} isInvalid={!this.state.isubmittable}/>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password"
                  value={this.state.pass}
                  onChange={this.changePass}
                  isInvalid={!this.state.isubmittable}
                  onKeyPress={event => {
                    if (event.key === "Enter") {
                      this.confirmCreds();
                    }
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Either your username or password is incorrect.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mt-4 d-flex justify-content-center">
              <Button
              onClick={this.confirmCreds}
              style={{cursor: "pointer"}}
              >Sign in</Button>
            </Form.Group>
            </Form>
          </Container>
        </Container>
    );
  }
}

export default withRouter(UserLanding);
