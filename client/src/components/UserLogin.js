import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button,Row,Col } from 'react-bootstrap';
import '../css/loginview.css';

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

    this.changeUser = this.changeUser.bind(this);
    this.changePass = this.changePass.bind(this);
    this.confirmCreds = this.confirmCreds.bind(this);

    if (this.props.location.state !== undefined && this.props.location.state.logged){
      this.props.history.push("/results", this.props.location.state);
    }

  }

  checkSubmittable = function(){
    if (this.state.user.trim() === "" || this.state.pass.trim() === ""){
      this.setState({submittable: false});
    }else{
      this.setState({submittable: true});
    }
  }



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
            this.props.history.push("/results", { logged: true, admin: result.Admin, user: this.state.user});
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

  changeUser = (event) => {
    this.setState({user: event.target.value});
    this.checkSubmittable();
  }

  changePass = (event) => {
    this.setState({pass: event.target.value});
    this.checkSubmittable();
  }





  render() {
    return(
      <div id="login-full-bg">
        <Navbar id="client-top-bar" className="main-nav main-client-nav" expand="lg" bg="dark">
          <Container>
           <Nav>
             <Nav.Link id="signin-link" disabled>.</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          <Col sm={{span: 8, offset: 2}} className="login-container">
            <Form id="login-form">
              <h1 id="signin-title">Sign-in</h1>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Username</Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" placeholder="Username" value={this.state.user} onChange={this.changeUser} isInvalid={!this.state.isubmittable}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Password</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="password"
                    placeholder="Password"
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
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" id="signin-btn-panel">
                <div>
                  <Button onClick={this.confirmCreds} className={"green-button " + (this.state.submittable ? "" : "disabled")} disabled={!this.state.submittable}>Sign in</Button>
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Container>
      </div>
    );
  }
}

export default withRouter(UserLanding);
