import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


class AdminModifyUser extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return(
      <Container fluid className="page-container">
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
        </Container>
      </Container>
    );
  }
}

export default(AdminModifyUser);