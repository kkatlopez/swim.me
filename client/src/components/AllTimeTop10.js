import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown} from 'react-bootstrap';
import '../css/alltimetop10.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Top10IndividualEvent from './Top10IndividualEvent.js';

class AllTimeTop10 extends Component {
	
  constructor(props) {
	super(props);
  this.state = {
    event: "",
    showTable: false
  };
  this.showTable = this.showTable.bind(this);
  }
	
  showTable(event) {
    console.log(event);
    switch (event) {
      case "M 500 Free":
        this.setState({ showTable: true });
        break;
      case "":
        this.setState({ showTable: false });
        break;
    }
  }

  render() {
    const { showTable } = this.state;
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Times</h1>
        </Container>
        <Container className="px-4">
          <a href="/" className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to time search</p>
            </a>
          <label>Event</label>
          <DropdownButton className="dropdown pb-3" title="Select an event">
            <Dropdown.Item onClick={() => this.showTable("")}>-</Dropdown.Item>
            <Dropdown.Item href="#/action-1">W 50 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-2">M 50 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-3">W 100 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-4">M 100 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-5">W 200 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-6">M 200 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-7">W 500 Free</Dropdown.Item>
            <Dropdown.Item onClick={() => this.showTable("M 500 Free")}>M 500 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-9">W 1000 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-10">M 1000 Free</Dropdown.Item>
          </DropdownButton>

          {showTable && <Top10IndividualEvent/>}
          
        </Container>
      </Container>      
    );
  }
}

export default(AllTimeTop10);
