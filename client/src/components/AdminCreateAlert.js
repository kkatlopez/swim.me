import React, { Component } from 'react';
import { Container, Form, Button, Row, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation.js";

class AdminCreateAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      type: "",
      endDate: new Date(),
      submittable: false,
      isubmittable: true,
      showModal: false,
      logged: this.props.location.state.logged,
      admin: this.props.location.state.admin,
      user: this.props.location.state.user
    }

    // updates the content of the form whenever there is a change:
    this.changeText = this.changeText.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.confirmForm = this.confirmForm.bind(this);
    this.checkSubmittable = this.checkSubmittable.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
    // redirect to login if not logged in
    if (this.props.location.state === undefined){
      this.props.history.push("/admin", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/admin", { logged: false });
    }
    else if (this.props.location.state.logged === false){
      this.props.history.push("/admin", { logged: false });
    }
    else if (this.props.location.state.admin === false){
      this.props.history.push("/", { logged: true });
    }
  }

  // check if the form is submittable -- if text is empty, priority is not set, OR end date is before the current day (today), set submittable to false; disables Submit button
  checkSubmittable = function(){
    const today = new Date();
    if (this.state.text.trim() === "" || this.state.type.trim() === "Select alert priority" || this.state.endDate < today){
      this.setState({submittable: false});
    } else{
      this.setState({submittable: true});
    }
  }

  // posting alert to database
  confirmForm = function (event) {
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:3001/create_alert", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(
        (result) => {
          if (result.Result === true) {
            this.setState({
              showModal: true
            });
          } else {
            this.setState({
              text: "",
              type: "",
              endDate: new Date(),
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
  
  // following 3 functions are used to change state of form:
  changeText = (event) => {
    this.setState({text: event.target.value}, () => this.checkSubmittable());
  }

  changeType = (event) => {
    this.setState({type: event.target.value}, () => this.checkSubmittable());
  }

  changeDate = (event) => {
    this.setState({endDate: event.target.value}, () => this.checkSubmittable());
  }

  // used to close modal upon successful submission of alert
  closeModal() {
    this.setState({ 
      showModal: false
    });
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/admin", { logged: logged, admin: admin, user: user });
  }

  // send props to other admin components
  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/admin", { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Container className="px-4">
          <a onClick={() => this.sendProps()} className="standalone">
            <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to Admin Dashboard</p>
          </a>
          <h2 className="sectionTitle">Create Alert</h2>
        </Container>
        <Container className="px-4">
       
          <Form className="py-3" onSubmit={this.confirmForm}>
            <Form.Group className="mb-3" controlId="form.Text">
              <Form.Label>Alert Description</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Enter short alert description"
                    className="me-2"
                    aria-label="Alert Description"
                    value={this.state.text}
                    onChange={this.changeText}
                    isInvalid={!this.state.isubmittable}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a description.
                  </Form.Control.Feedback>
                </div>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="form.Priority">
              <Form.Label>Alert Type</Form.Label>
              <div className="d-flex">
                <Form.Select 
                  aria-label="Select alert priority"
                  placeholder="Select alert priority"
                  value={this.state.type}
                  onChange={this.changeType}
                  isInvalid={!this.state.isubmittable}
                >
                  <option>Select alert priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="Info">Info</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select a priority.
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="form.Date">
              <Form.Label>Alert End Date</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  className="me-2"
                  value={this.state.endDate}
                  onChange={this.changeDate}
                  isInvalid={!this.state.isubmittable}
                />
                <Form.Control.Feedback type="invalid">
                  Select a date in the future.
                </Form.Control.Feedback>
                </div>
            </Form.Group>
            <Button type="submit" disabled={!this.state.submittable}>Create Alert</Button>
            </Form>
            {this.state.showModal &&
              <Modal show={this.state.showModal} onHide={this.closeModal} id="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                  <Modal.Title>Your changes have been saved!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have created an alert.</Modal.Body>
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

export default withRouter(AdminCreateAlert);