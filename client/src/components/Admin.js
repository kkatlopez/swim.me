import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Col, Button, Row } from 'react-bootstrap';
// import AdminCreateAlert from './AdminCreateAlert.js';
// import AdminModifyUser from './AdminModifyUser.js';
// import AdminEditForm from './AdminEditForm.js';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation.js";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // event: ""
    };
    if(this.props.location.state == undefined){
      this.props.history.push("/", { logged: false });
		}
		else if (!('logged' in this.props.location.state)){
			this.props.history.push("/", { logged: false });
		}
		else if(this.props.location.state.logged == false){
			this.props.history.push("/", { logged: false });
		}
    else if(this.props.location.state.admin == false){
			this.props.history.push("/", { logged: true });
		}
  }

  sendProps(url) {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push(url, { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Container className="px-4">
          <a onClick={() => this.sendProps("/")} className="standalone">
            <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to Meet Results</p>
          </a>
          <h2 className="sectionTitle">Admin Dashboard</h2>
          <h3 className="sectionTitle text-center pt-3 pb-2">What would you like to do?</h3>
          <div className="d-flex justify-content-center">
            <Button
                  // as={Link}
                  // to={{pathname: "/admin/create-alert", state: {logged: true}}}
                  className="mx-2"
                  onClick={() => this.sendProps("/admin/create-alert")}
                >
                  Create Alert
            </Button>
            <Button
                // as={Link}
                // to={{pathname: "/admin/edit-swimmer", state: {logged: true}}}
                className="mx-2"
                onClick={() => this.sendProps("/admin/edit-swimmer")}
              >
                Edit Swimmer
              </Button>
              <Button
                // as={Link}
                // to={{pathname: "/admin/modify-user", state: {logged: true}}}
                className="mx-2"
                onClick={() => this.sendProps("/admin/modify-user")}
              >
                Modify User
              </Button>
          </div>
          {/* <Row>
            <Col>
              <Button as={Link} to="/admin" logged={false} className="gray-button">Sign Out</Button>
            </Col>
          </Row> */}
        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}

export default withRouter(Admin);