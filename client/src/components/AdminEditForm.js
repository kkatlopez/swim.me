import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Form, Button, Row, Modal } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation.js";

class AdminEditForm extends Component {
  constructor(props) {
	  super(props);    
    this.state = {
      swimmers: [],
      placeholderBody: "Please select a swimmer",
      firsttext: "Please select a swimmer",
      lasttext: "Please select a swimmer",
      postext: "Please select a swimmer",
      classtext: "Please select a swimmer",
      hometext: "Please select a swimmer",
      hightext: "Please select a swimmer",
      currentSelect: -1,
      name: "",
      show: false,
      showModal: false
    }

    this.changeSwimmer = this.changeSwimmer.bind(this);
    this.changeFirst = this.changeFirst.bind(this);
    this.changeLast = this.changeLast.bind(this);
    this.changePos = this.changePos.bind(this);
    this.changeClass = this.changeClass.bind(this);
    this.changeHome = this.changeHome.bind(this);
    this.changeHigh = this.changeHigh.bind(this);
    this.updateSwimmer = this.updateSwimmer.bind(this);
    this.closeModal = this.closeModal.bind(this);

    //BELOW IS THE CODE TO BLOCK OFF WHEN NOT LOGGED IN
    if(this.props.location.state == undefined){
      this.props.history.push("/admin", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/admin", { logged: false });
    }
    else if(this.props.location.state.logged == false){
      this.props.history.push("/admin", { logged: false });
    }
    else if(this.props.location.state.admin == false){
      this.props.history.push("/", { logged: true });
    }
  }
  
  changeSwimmer = (event) =>{	
    if (event.target.value == 'placeholder') {
      var temp = this.state.placeholderBody;
      this.setState({
        currentSelect: -1,
        name: temp,
        firsttext: temp,
        lasttext: temp,
        postext: temp,
        classtext: temp,
        hometext: temp,
        hightext: temp,
        });
    } else {
      var selected = event.target.value;
      var temp = this.state.swimmers.findIndex(record => (record.lastName + ", " + record.firstName) == selected);
      this.setState ({
        name: selected,
        currentSelect: event.target.value,
        firsttext: this.state.swimmers[temp].firstName,
        lasttext: this.state.swimmers[temp].lastName,
        postext: this.state.swimmers[temp].position,
        classtext: this.state.swimmers[temp].classYear,
        hometext: this.state.swimmers[temp].hometown,
        hightext: this.state.swimmers[temp].highSchool,
        show: true
      });
    }
	}
  
  changeFirst = (event) => {
    if (this.state.currentSelect != -1) {this.setState({firsttext: event.target.value})};
  }

  changeLast = (event) => {
     if(this.state.currentSelect != -1){this.setState({lasttext: event.target.value})};
  }
  
  changePos = (event) => {
     if(this.state.currentSelect != -1){this.setState({postext: event.target.value});}
  }
  
  changeClass = (event) => {
     if(this.state.currentSelect != -1){this.setState({classtext: event.target.value});}
  }
  
  changeHome = (event) => {
     if(this.state.currentSelect != -1){this.setState({hometext: event.target.value});}
  }
  
  changeHigh = (event) => {
    if(this.state.currentSelect != -1){this.setState({hightext: event.target.value});}
  }
  
  updateSwimmer = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch("http://localhost:3001/edit_swimmer_info", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firsttext: this.state.firsttext, 
        lasttext: this.state.lasttext, 
        postext: this.state.postext,
        classtext: this.state.classtext,
        hometext: this.state.hometext,
        hightext: this.state.hightext,
        name: this.state.name
      })
    })
      .then(
        (result) => {
          this.setState ({
            showModal: true
          });
          if (result.status !== 200) {
            this.setState({ submittable: false });
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
    this.props.history.push("/admin/", { logged: true });
  }

  populatePage() {
    fetch("http://localhost:3001/swimmer_info")
      .then(res => res.json())
      .then(
        (result) => {
          var sorted = result.sort((a, b) => (a.lastName + ", " + a.firstName) > (b.lastName + ", " + b.firstName) ? 1 : -1);
          this.setState({
            swimmers: sorted
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
          <h2 className="sectionTitle">Edit Swimmer</h2>
        </Container>
        <Container className="px-4">
          <Form className="py-3" onSubmit={this.updateSwimmer}>
            <Form.Group className="mb-3">
              <Form.Label><h4 className="sectionTitle">Select a Swimmer</h4></Form.Label>
              <Form.Select
                aria-label="Select which swimmer to edit"
                value={this.state.currentSelect}
                onChange={this.changeSwimmer}
                className="me-2"
              >
                <option value="placeholder">Select a swimmer</option>
                {
                  this.state.swimmers.map( (item) => {
                    var name = item.lastName + ", " + item.firstName;
                    return(<option value={name}>{name}</option>)
                  })
                }
              </Form.Select>
            </Form.Group>
           
            {this.state.show &&
              <Container fluid>
                <Form.Group as={Row} className="mb-3" controlId="form.Text">
                <Form.Label>First Name</Form.Label>
                <div className="d-flex">
                  <Form.Control disabled
                    type="text"
                    value={this.state.firsttext}
                    onChange={this.changeFirst}
                    className="me-2"
                  />
                </div>
                </Form.Group>
            
                <Form.Group as={Row} className="mb-3" controlId="form.Text">
                  <Form.Label>Last Name</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text" disabled
                      value={this.state.lasttext}
                      onChange={this.changeLast}
                      className="me-2"
                    />
                  </div>
                </Form.Group>
            
                <Form.Group as={Row} className="mb-3" controlId="form.Text">
                  <Form.Label>Position</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      value={this.state.postext}
                      onChange={this.changePos}
                      className="me-2"
                    />
                  </div>
                </Form.Group>
            
                <Form.Group as={Row} className="mb-3" controlId="form.Text">
                  <Form.Label>Class Year</Form.Label>
                  <div className="d-flex">
                    <Form.Select
                      aria-label="Select a swimmer"
                      placeholder="Select a swimmer"
                      value={this.state.classtext}
                      onChange={this.changeClass}
                      className="me-2"
                    >
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Grad">Grad</option>
                    </Form.Select>
                  </div>
                </Form.Group>
            
                <Form.Group as={Row} className="mb-3" controlId="form.Text">
                  <Form.Label>Hometown</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      value={this.state.hometext}
                      onChange={this.changeHome}
                      className="me-2"
                    />
                  </div>
                </Form.Group>
            
                <Form.Group as={Row} className="mb-3" controlId="form.Text">
                  <Form.Label>High School</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      value={this.state.hightext}
                      onChange={this.changeHigh}
                      className="me-2"
                    />
                  </div>
                </Form.Group>
            
                <Container className="d-flex justify-content-center">
                  <Button
                    as={Link}
                    to={{pathname: "/admin", state: {logged: true}}}
                    className="mx-3">
                      Cancel
                  </Button>
                  <Button className="mx-3" type="submit">Submit</Button>
                </Container>
              </Container>
            }
            </Form>
            { this.state.showModal &&
              <Modal show={this.state.showModal} onHide={this.closeModal} id="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                  <Modal.Title>Your changes have been saved!</Modal.Title>
                </Modal.Header>
                <Modal.Body>You have modifed a swimmer.</Modal.Body>
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

export default withRouter(AdminEditForm);