import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, FormControl, Button } from 'react-bootstrap';

class AdminCreateAlert extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container className="px-4">
        <Form className="pb-3">
          <Form.Group className="mb-3" controlId="form.Text">
            <label>Alert Description</label>
              <div className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Enter short alert description"
                  className="me-2"
                  aria-label="Alert Description"
                />
              </div>
          </Form.Group>
            <Form.Group className="mb-3" controlId="form.Priority">
              <label>Alert Type</label>
              <Form.Select aria-label="Select alert priority">
                <option>Select alert priority</option>
                <option value="Immediate">Immediate</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
          </Form.Group>
            <Form.Group className="mb-3" controlId="form.Date">
              <label>Alert End Date</label>
              <div className="d-flex">
                <FormControl
                  type="date"
                  className="me-2"
                />
              </div>
          </Form.Group>
            <Form.Group className="mb-3" controlId="form.Submit">
              <Button>Submit</Button>
            </Form.Group>
          </Form>
        </Container>
      </Container>
    );
  }
}

export default(AdminCreateAlert);