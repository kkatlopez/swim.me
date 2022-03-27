import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


class AdminEditSwimmer extends Component {
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
                <th>Position</th>
                <th>Class</th>
                <th>Hometown</th>
                <th>High School</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex justify-content-sm-between">
                    Gwyneth
                    <Button variant="outline-primary" size="sm">
                      <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-sm-between">
                    Yuen
                    <Button variant="outline-primary" size="sm">
                      <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-sm-between">
                    Freestyle/Backstroke
                    <Button variant="outline-primary" size="sm">
                      <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-sm-between">
                    Senior
                    <Button variant="outline-primary" size="sm">
                      <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-sm-between">
                    Princeton Jct., NJ
                    <Button variant="outline-primary" size="sm">
                      <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
                    </Button>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-sm-between">
                    West Windsor-Plainsboro North
                    <Button variant="outline-primary" size="sm">
                      <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </Container>
    );
  }
}

export default(AdminEditSwimmer);