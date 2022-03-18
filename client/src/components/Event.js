import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import '../css/event.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import EventTable from "./EventTable.js";

class FrontPage extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
        meetinfo: [],
        event: "",
        showTable: false
      }
      this.showTable = this.showTable.bind(this);
  }

  //AJAX Calls
  populateEvent() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var fullList = result;
          console.log(this.props);
          var temp = result.findIndex(x => x.meet_name == this.props.match.params.eventName);
          console.log(temp);
          this.setState({
            meetinfo: fullList[temp]
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  showTable(event) {
    console.log(event);
    switch (event) {
      case "":
        this.setState({ showTable: false });
        break;
      default:
        this.setState({ showTable: true });
        break;
    }
  }
	
  render() {
    this.populateEvent();
    const { showTable } = this.state;
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Meet Results</h1>
        </Container>
        <Container className="px-4">
            <a href="/meet" className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to meet</p>
            </a>

            <h2>{this.state.meetinfo[0]}</h2>
            <p class="text-muted">{this.state.meetinfo[1]} - {this.state.meetinfo[2]}</p>

            <label>Event</label>
            <DropdownButton className="dropdown pb-3" title="Select an event">
                {/* <Dropdown.Item >W 200 Medley Relay</Dropdown.Item>
                <Dropdown.Item href="#/action-2">M 200 Medley Relay</Dropdown.Item>
                <Dropdown.Item href="#/action-3">W 1000 Free</Dropdown.Item>
                <Dropdown.Item href="#/action-3">M 1000 Free</Dropdown.Item> */}
                {
                    this.state.meetinfo.map( (lister) => {
                        return(<Dropdown.Item onClick={() => this.showTable(lister.meet_name)}>{lister.meet_name}</Dropdown.Item>)
                    })
                }
            </DropdownButton>

            {showTable && <EventTable eventname={this.state.meetinfo[0]} results={this.meetinfo[1]}/>}

        </Container>
      </Container>      
    );
  }
}

export default(FrontPage);
