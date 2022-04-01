import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Link, withRouter } from 'react-router-dom';
import { Container, DropdownButton, Dropdown } from 'react-bootstrap';
import '../css/rosterprofile.css';
import { Link, withRouter } from 'react-router-dom';
import RosterProfileLatest from './RosterProfileLatest';
import RosterProfileFastest from './RosterProfileFastest.js';
import RosterProfileEvent from './RosterProfileEvent.js';

class RosterProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      event: "",
      showTable: false,
      showFastest: false,
      showEvent: false,
    };
    this.showTable = this.showTable.bind(this);
    this.showFastest = this.showFastest.bind(this);
    this.showEvent = this.showEvent.bind(this);

		if(this.props.location.state == undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged == false){
      this.props.history.push("/", { logged: false });
    }
  }

  showTable(event) {
    console.log(event);
    switch (event) {
      case "Latest":
        this.setState({ showTable: true });
        this.setState({ showFastest: false });
        this.setState({ showEvent: false });
        break;
      case "":
        this.setState({ showTable: false });
        break;
    }
  }

  showFastest(event) {
    switch(event) {
      case "Fastest":
        this.setState({ showFastest: true });
        this.setState({ showTable: false });
        this.setState({ showEvent: false });
        break;
      case "":
        this.setState( { showFastest: false });
        break
    }
  }

  showEvent(event) {
    switch(event) {
      case "Event":
        this.setState({ showFastest: false });
        this.setState({ showTable: false });
        this.setState({ showEvent: true });
        break;
      case "":
        this.setState( {showEvent: false });
        break;
    }
  }

  render() {
    const { showTable } = this.state;
    const { showFastest } = this.state;
    const { showEvent } = this.state;

    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Roster</h1>
        </Container>
        <Container className="px-4">
            <h2>Gwyneth Yuen</h2>
            <div className="d-flex">
                <div>
                    <img src="https://rpiathletics.com/images/2021/10/5/Yuen_Gwyneth.jpg?width=300" className="img-thumbnail"></img>
                </div>
                <div className="info px-2">
                    <p><b>Position: </b>Freestyle/Backstroke</p>
                    <p><b>Class: </b>Senior</p>
                    <p><b>Hometown: </b>Princeton Jct., NJ</p>
                    <p><b>High School: </b>West Windsor-Plainsboro North</p>
                </div>
            </div>
        </Container>
        <hr align="center"></hr>
        <Container className="px-4">
            <label>View times by</label>
            <DropdownButton className="dropdown pb-3" title="Select an option">
                <Dropdown.Item href="#" onClick={() => this.showTable("Latest")}>Latest</Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => this.showFastest("Fastest")}>Fastest</Dropdown.Item>
                <Dropdown.Item href="#" onClick={() => this.showEvent("Event")}>By Event</Dropdown.Item>
            </DropdownButton>

            {(showTable && <RosterProfileLatest/>) ||
            (showFastest && <RosterProfileFastest/>) ||
            (showEvent && <RosterProfileEvent/> )}
        </Container>

      </Container>
    );
  }
}

export default withRouter(RosterProfile);
