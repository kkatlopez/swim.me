import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Table, Form, FormControl, Button } from 'react-bootstrap';
import AdminCreateAlert from './AdminCreateAlert.js';
import AdminModifyUser from './AdminModifyUser.js';
import AdminEditSwimmer from './AdminEditSwimmer.js';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      showCreateAlert: false
    };
    this.showCreateAlert = this.showCreateAlert.bind(this);
    this.showModifyUser = this.showModifyUser.bind(this);
    this.showEditSwimmer = this.showEditSwimmer.bind(this);
  }

  showCreateAlert(event) {
    console.log(event);
    switch (event) {
      case "Create Alerts":
        this.setState({ showCreateAlert: true });
        this.setState({ showModifyUser: false });
        this.setState({ showEditSwimmer: false });
        break;
      case "":
        this.setState({ showCreateAlert: false });
        break;
    }
  }

  showModifyUser(event) {
    console.log(event);
    switch (event) {
      case "Modify User":
        this.setState({ showModifyUser: true });
        this.setState({ showCreateAlert: false });
        this.setState({ showEditSwimmer: false });
        break;
      case "":
        this.setState({ showModifyUser: false });
        break;
    }
  }

  showEditSwimmer(event) {
    console.log(event);
    switch (event) {
      case "Edit Swimmer":
        this.setState({ showEditSwimmer: true });
        this.setState({ showModifyUser: false });
        this.setState({ showCreateAlert: false });
        break;
      case "":
        this.setState({ showEditSwimmer: false });
        break;
    }
  }

  render() {
    const { showCreateAlert } = this.state;
    const { showModifyUser } = this.state;
    const { showEditSwimmer } = this.state;

    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Container className="px-4">
            {/* <a href="/" className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to all meets</p>
            </a> */}
          <label>Admin Dashboard</label>
          <DropdownButton className="dropdown pb-3" title="Select a task">
            <Dropdown.Item href="#/create-alert" onClick={() => this.showCreateAlert("Create Alerts")}>Create Alerts</Dropdown.Item>
            <Dropdown.Item href="#/modify-users" onClick={() => this.showModifyUser("Modify User")}>Modify User</Dropdown.Item>
            <Dropdown.Item href="#/edit-info" onClick={() => this.showEditSwimmer("Edit Swimmer")}>Edit Swimmer Info</Dropdown.Item>
          </DropdownButton>
            {(showCreateAlert && <AdminCreateAlert/>) ||
                (showModifyUser && <AdminModifyUser/>) || 
                (showEditSwimmer && <AdminEditSwimmer/> )}
        </Container>
      </Container>
    );
  }
}

export default(Admin);