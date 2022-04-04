import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Col, Button, Row } from 'react-bootstrap';
// import AdminCreateAlert from './AdminCreateAlert.js';
// import AdminModifyUser from './AdminModifyUser.js';
// import AdminEditForm from './AdminEditForm.js';
import { Link, withRouter } from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // event: ""
    };
    // if(this.props.location.state == undefined){
    //   this.props.history.push("/", { logged: false });
		// }
		// else if (!('logged' in this.props.location.state)){
		// 	this.props.history.push("/", { logged: false });
		// }
		// else if(this.props.location.state.logged == false){
		// 	this.props.history.push("/", { logged: false });
		// }
  }


  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Row className="px-3">
          <h2>Admin Dashboard</h2>
        </Row>
        <Row className="px-3">
          <Col>
            <Button
              as={Link}
              to={{pathname: "/admin/create-alert", state: {logged: true}}}
              className="green-button">Create Alert
            </Button>
          </Col>
        </Row>
        
        <Row className="px-3">
          <Col>
            <Button
              as={Link}
              to={{pathname: "/admin/edit-swimmer", state: {logged: true}}}
              className="green-button">
                Edit Swimmer
            </Button>
          </Col>
        </Row>

        <Row className="px-3">
          <Col>
            <Button
              as={Link}
              to={{pathname: "/admin/modify-user", state: {logged: true}}}
              className="green-button">
                Modify User
              </Button>
          </Col>
        </Row>
        {/* <Row className="px-3">
          <Col>
            <Button as={Link} to="/admin" logged={false} className="gray-button">Sign Out</Button>
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default withRouter(Admin);