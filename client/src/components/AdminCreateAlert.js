import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Form, Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class AdminCreateAlert extends Component {
  constructor(props) {
      super(props);
      this.state = {
        text: "",
        type: "",
        endDate: new Date(),
        submittable: false,
        isubmittable: true
      }

      this.changeText = this.changeText.bind(this);
      this.changeType = this.changeType.bind(this);
      this.changeDate = this.changeDate.bind(this);
      this.confirmForm = this.confirmForm.bind(this);
      // if(this.props.location.state == undefined){
      //   this.props.history.push("/", { logged: false });
      // }
      // else if (!('logged' in this.props.location.state)){
      //   this.props.history.push("/", { logged: false });
      // }
      // else if(this.props.location.state.logged == false){
      //   this.props.history.push("/", { logged: false });
      // }
  }

  checkSubmittable = function(){
    const today = new Date();
    if (this.state.text.trim() == "" || this.state.type.trim() == "Select alert priority" || this.state.endDate < today){
      this.setState({submittable: false});
    }else{
      this.setState({submittable: true});
    }
  }

  confirmForm = function () {
    fetch("http://localhost:3001/create_alert", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(
        (result) => {
          if (result.Result == true) {
            this.props.history.push("/admin", { text: result.text, type: result.type, endDate: result.endDate});
          }
          else{
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

  changeText = (event) => {
    this.setState({text: event.target.value});
    this.checkSubmittable();
  }

  changeType = (event) => {
    this.setState({type: event.target.value});
    this.checkSubmittable();
  }

  changeDate = (event) => {
    this.setState({endDate: event.target.value});
    this.checkSubmittable();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Row className="px-3">
          <h2>Create Alert</h2>
        </Row>
        <Container className="px-4">
        <a href="/admin" className="standalone">
          <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to Admin Dashboard</p>
        </a>
        <Form className="pb-3">
          <Form.Group as={Row} className="mb-3" controlId="form.Text">
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
                  <option value="Immediate">Immediate</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
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
            <Form.Group as={Row} className="mb-3" controlId="form.Submit">
              <div>
                <Button onClick={this.confirmForm} className={"green-button " + (this.state.submittable ? "" : "disabled")} disabled={!this.state.submittable}>Submit</Button>
              </div>
            </Form.Group>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default withRouter(AdminCreateAlert);