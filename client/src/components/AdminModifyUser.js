import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Table, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';


class AdminModifyUser extends Component {
  constructor(props) {
      super(props);
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

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Row className="px-3">
          <h2>Modify User</h2>
        </Row>
        <Container className="px-4">
          <Table bordered>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gwyneth</td>
                <td>Yuen</td>
                <td>yueng</td>
                <td>gwyneth.yuen@gmail.com</td>
                <td>Swimmer</td>
                <td>
                  <Button variant="outline-primary" size="sm">
                    <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
                  </Button>
                  <Button variant="outline-primary" size="sm">
                      <FontAwesomeIcon icon={faTrashCan} className="px-0"/>
                    </Button>
                </td>
              </tr>
            </tbody>
          </Table>
          {/* <Button as={Link} to={{pathname: "/add_user", state: {logged: true}}} className="green-button">Create User</Button> */}
        </Container>
      </Container>
    );
  }
}

export default withRouter(AdminModifyUser);