import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Form, Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class AdminEditForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
        first: "",
        last: "",
        pos: "",
        class: "",
        hometown: "",
        highschool: "",
        submittable: false,
        isubmittable: true
      }

      this.changeFirst = this.changeFirst.bind(this);
      this.changeLast = this.changeLast.bind(this);
      this.changePos = this.changePos.bind(this);
      this.changeClass = this.changeClass.bind(this);
      this.changeHometown = this.changeHometown.bind(this);
      this.changeHighSchool = this.changeHighSchool.bind(this);
      // this.confirmForm = this.confirmForm.bind(this);
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
    if (this.state.first.trim() == "" || this.state.last.trim() == "" || this.state.pos.trim() == "" || this.state.class.trim() == "" || this.state.hometown.trim() == "" || this.state.highschool.trim() == ""){
      this.setState({submittable: false});
    }else{
      this.setState({submittable: true});
    }
  }

  getInfo = function() {
    fetch("http://localhost:3001/edit_swimmer_info", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(
        (result) => {
          if (result.Result == true) {
            this.props.history.push("/admin", {
              first: result.first,
              last: result.last,
              pos: result.pos,
              class: result.class,
              hometown: result.hometown,
              highschool: result.highschool,
              submittable: false,
              isubmittable: true
            });
          }
          else{
            this.setState({
              first: "",
              last: "",
              pos: "",
              class: "",
              hometown: "",
              highschool: "",
              isubmittable: true
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

  // confirmForm = function () {
  //   fetch("http://localhost:3001/edit_swimmer_info", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(this.state)
  //   }).then(res => res.json())
  //     .then(
  //       (result) => {
  //         if (result.Result == true) {
  //           this.props.history.push("/admin", {
  //             first: result.first,
  //             last: result.last,
  //             pos: result.pos,
  //             class: result.class,
  //             hometown: result.hometown,
  //             highschool: result.highschool,
  //             submittable: false,
  //             isubmittable: true
  //           });
  //         }
  //         else{
  //           this.setState({
  //             first: "",
  //             last: "",
  //             pos: "",
  //             class: "",
  //             hometown: "",
  //             highschool: "",
  //             isubmittable: true
  //           });
  //           this.checkSubmittable();
  //         }
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  //   }

  changeFirst = (event) => {
    this.setState({text: event.target.value});
    this.checkSubmittable();
  }

  changeLast = (event) => {
    this.setState({text: event.target.value});
    this.checkSubmittable();
  }

  changePos = (event) => {
    this.setState({text: event.target.value});
    this.checkSubmittable();
  }

  changeClass = (event) => {
    this.setState({text: event.target.value});
    this.checkSubmittable();
  }

  changeHometown = (event) => {
    this.setState({text: event.target.value});
    this.checkSubmittable();
  }

  changeHighSchool = (event) => {
    this.setState({text: event.target.value});
    this.checkSubmittable();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Row className="px-3">
          <h2>Edit Swimmer Form</h2>
        </Row>
        <Container className="px-4">
        <a href="/admin" className="standalone">
          <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to Admin Dashboard</p>
        </a>
        <Form className="pb-3">
          <Form.Group as={Row} className="mb-3" controlId="form.Text">
            <Form.Label>First Name</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder={this.state.first}
                  className="me-2"
                  aria-label="Enter first name"
                  value={this.state.text}
                  onChange={this.changeText}
                  isInvalid={!this.state.isubmittable}
                />
                <Form.Control.Feedback type="invalid">
                  Enter a first name.
                </Form.Control.Feedback>
              </div>

              <Form.Label>Last Name</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  className="me-2"
                  aria-label="Enter last name"
                  value={this.state.text}
                  onChange={this.changeText}
                  isInvalid={!this.state.isubmittable}
                />
                <Form.Control.Feedback type="invalid">
                  Enter a last name.
                </Form.Control.Feedback>
              </div>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="form.Text">
            <Form.Label>Position</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter position"
                  className="me-2"
                  aria-label="Enter position"
                  value={this.state.text}
                  onChange={this.changeText}
                  isInvalid={!this.state.isubmittable}
                />
                <Form.Control.Feedback type="invalid">
                  Enter a position.
                </Form.Control.Feedback>
              </div>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="form.Text">
            <Form.Label>Class Year</Form.Label>
              <div className="d-flex">
                <Form.Select 
                  aria-label="Select class year"
                  placeholder="Select class year"
                  value={this.state.type}
                  onChange={this.changeType}
                  isInvalid={!this.state.isubmittable}
                >
                  <option>Select class year</option>
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Grad">Grad</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Select a class year.
                </Form.Control.Feedback>
              </div>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="form.Text">
            <Form.Label>Hometown</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter a hometown"
                  className="me-2"
                  aria-label="Enter a hometown"
                  value={this.state.text}
                  onChange={this.changeText}
                  isInvalid={!this.state.isubmittable}
                />
                <Form.Control.Feedback type="invalid">
                  Enter a hometown.
                </Form.Control.Feedback>
              </div>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="form.Text">
            <Form.Label>High School</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Enter a high school"
                  className="me-2"
                  aria-label="Enter a high school"
                  value={this.state.text}
                  onChange={this.changeText}
                  isInvalid={!this.state.isubmittable}
                />
                <Form.Control.Feedback type="invalid">
                  Enter a high school.
                </Form.Control.Feedback>
              </div>
          </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="form.Submit">
              {/* <div>
                <Button onClick={this.confirmForm} className={"green-button " + (this.state.submittable ? "" : "disabled")} disabled={!this.state.submittable}>Submit</Button>
              </div> */}
            </Form.Group>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default withRouter(AdminEditForm);