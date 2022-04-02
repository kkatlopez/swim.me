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
      swimmers: [],
      searchTerm: "",
      // test: "original",
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
    this.searchSwimmer = this.searchSwimmer.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
  }

  // newButton = function() {
  //   return (
  //       <Button variant="outline-primary" size="sm"
  //       as={Link} to={{pathname: "/admin/edit-swimmer-form"}}>
  //         <FontAwesomeIcon icon={faPenToSquare} className="px-0"/>
  //       </Button>
  // )}

  changeTerm = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  searchSwimmer = function() {
  // Declare variables
    var input, filter, table, tr, td, txtValue;
    // input = document.getElementById("myInput");
    // filter = input.value.toUpperCase();
    filter = this.state.searchTerm.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        // this.setState({test: txtValue});
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

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
            this.state = {
              swimmers: [],
              searchTerm: "",
              // test: "",
            }
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
            this.state = {
              swimmers: [],
              searchTerm: ""
            }
            this.setState({swimmers: []});
            this.setState({swimmers: result});

            var table = document.getElementById("myTable");
            for(let i = 0; i < table.childNodes.length; i++) {
              table.childNodes[i].remove();
            }

            for(let i = 0; i < this.state.swimmers.length; i++) {
              this.addRow(this.state.swimmers.at(i).firstName,
              this.state.swimmers.at(i).lastName, 
              this.state.swimmers.at(i).position,
              this.state.swimmers.at(i).classYear,
              this.state.swimmers.at(i).hometown,
              this.state.swimmers.at(i).highSchool
            );
        };
          this.state = {
            swimmers: [],
            searchTerm: "",
            // test: "reset"
          };
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
                  id="myInput"
                  type="search"
                  placeholder="Enter a first name"
                  className="me-2"
                  aria-label="Search"
                  value={this.state.searchTerm}
                  onChange={this.changeTerm}
                  />
                  <Button onClick={this.searchSwimmer}>Search</Button>
              </div>
          </Form>
          {/* <Button onClick={this.getInfo}>Get Info</Button> */}
          <Table id="myTable" bordered hover>
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
          <script type="text/javascript">
            {this.getInfo()}
          </script>
        </Container>
      </Container>
    );
  }
}

export default withRouter(AdminEditSwimmer);