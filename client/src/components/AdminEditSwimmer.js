import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Table, Button, Row, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';

class AdminEditSwimmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swimmers: []
    }
    // if(this.props.location.state == undefined){
		// 	this.props.history.push("/", { logged: false });
		// }
		// else if (!('logged' in this.props.location.state)){
		// 	this.props.history.push("/", { logged: false });
		// }
		// else if(this.props.location.state.logged == false){
		// 	this.props.history.push("/", { logged: false });
		// }
    this.getInfo = this.getInfo.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  newButton = function() {
    return (
        <Button variant="outline-primary" size="sm"
        as={Link} to={{pathname: "/admin/edit-swimmer-form"}}>
          <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
        </Button>
    )}

  addRow = function(firstName, lastName, position, classYear, hometown, highSchool) {
    var tableBody = document.getElementById('myTableBody');
    var newRow = tableBody.insertRow(tableBody.rows.length);

    var firstCell = newRow.insertCell(0);
    var lastCell = newRow.insertCell(1);
    var posCell = newRow.insertCell(2);
    var classCell = newRow.insertCell(3);
    var homeCell = newRow.insertCell(4);
    var highCell = newRow.insertCell(5);
    var buttonCell = newRow.insertCell(6);

    var firstText = document.createTextNode(firstName);
    var lastText = document.createTextNode(lastName);
    var posText = document.createTextNode(position);
    var classText = document.createTextNode(classYear);
    var homeText = document.createTextNode(hometown);
    var highText = document.createTextNode(highSchool);
    var buttonText = document.createElement("Button");
    
    firstCell.appendChild(firstText);
    lastCell.appendChild(lastText);
    posCell.appendChild(posText);
    classCell.appendChild(classText);
    homeCell.appendChild(homeText);
    highCell.appendChild(highText);
    buttonCell.appendChild(buttonText);
  };

  getInfo = function() {
    fetch("http://localhost:3001/swimmer_info", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(
        (result) => {
          if (result.Result == true) {
            // this.state = result;
            // this.state.swimmers = "hello results retrieved";
            // this.props.history.push({
            //   first: result.first,
            //   last: result.last,
            //   pos: result.pos,
            //   class: result.class,
            //   hometown: result.hometown,
            //   highschool: result.highschool,
            //   submittable: false,
            //   isubmittable: true
            // });
          }
          else{
            this.setState({swimmers: result});
            for(let i = 0; i < this.state.swimmers.length; i++) {
              this.addRow(this.state.swimmers.at(i).firstName,
              this.state.swimmers.at(i).lastName, 
              this.state.swimmers.at(i).position,
              this.state.swimmers.at(i).classYear,
              this.state.swimmers.at(i).hometown,
              this.state.swimmers.at(i).highSchool
            );
        };
            // this.setState({
            //   first: "",
            //   last: "",
            //   pos: "",
            //   class: "",
            //   hometown: "",
            //   highschool: "",
            //   isubmittable: true
            // });
          }
        },
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }
      )
    }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Admin</h1>
        </Container>
        <Row className="px-3">
          <h2>Edit Swimmer</h2>
        </Row>
        <Container className="px-4">
        <a href="/admin" className="standalone">
          <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to Admin Dashboard</p>
        </a>
        <Form className="pb-3">
              <label>Search for a swimmer</label>
                  <div className="d-flex">
                  <FormControl
                  type="search"
                  placeholder="Enter a name"
                  className="me-2"
                  aria-label="Search"
                  />
                  <Button>Search</Button>
              </div>
          </Form>
          <Button onClick={this.getInfo}>Get Info</Button>
          <Table id="myTable" bordered>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Class</th>
                <th>Hometown</th>
                <th>High School</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="myTableBody">
            </tbody>
          </Table>
        </Container>
      </Container>
    );
  }
}

export default withRouter(AdminEditSwimmer);