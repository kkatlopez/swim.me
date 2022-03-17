import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Table, Dropdown, DropdownButton } from 'react-bootstrap';
import EventTimes from './EventTimes.js';

class RosterProfileLatest extends Component {
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
          case "50 Y Free":
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
            <EventTimes/>
            {showTable && <EventTimes/>}
        </Container>      
      );
    }
  }
  
  export default(RosterProfileLatest);
  