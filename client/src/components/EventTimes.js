import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import '../css/eventtimes.css';

class EventTimes extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      showEvent: false
    };
    this.showEvent = this.showEvent.bind(this);
  }

  showEvent(event) {
    console.log(event);
    switch (event) {
      case "500 Y Free":
        this.setState({ showEvent: true });
        break;
      case "":
        this.setState({ showEvent: false });
        break;
    }
  }
	
  render() {
    return(
          <div className="event">
            <label className="pt-3">Event</label>
            <DropdownButton className="dropdown pb-3" title="Select an event">
              <Dropdown.Item onClick={() => this.showEvent("")}>-</Dropdown.Item>
              <Dropdown.Item href="#">50 Y Free</Dropdown.Item>
              <Dropdown.Item href="#">50 L Free</Dropdown.Item>
              <Dropdown.Item href="#">100 Y Free</Dropdown.Item>
              <Dropdown.Item href="#">100 L Free</Dropdown.Item>
              <Dropdown.Item href="#">200 Y Free</Dropdown.Item>
              <Dropdown.Item href="#">200 L Free</Dropdown.Item>
              <Dropdown.Item href="#">400 L Free</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.showEvent("500 Y Free")}>500 Y Free</Dropdown.Item>
            </DropdownButton>
            {this.state.showEvent && 
              <div>
                <h2>500 Y Free</h2>
                <Table bordered>
                  <thead>
                      <tr>
                      <th>Time</th>
                      <th>Meet</th>
                      <th>Date</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                      <td>4:50.64</td>
                      <td>MIT Invitational</td>
                      <td>Dec 05, 2021</td>
                      </tr>
                      <tr>
                      <td>4:50.10</td>
                      <td>MIT Invitational</td>
                      <td>Dec 05, 2021</td>
                      </tr>
                      <tr>
                      <td>4:55.86</td>
                      <td>RPI vs. Ithaca</td>
                      <td>Oct 30, 2021</td>
                      </tr>
                      <tr>
                      <td>RPI @ RIT</td>
                      <td>5:02.84</td>
                      <td>Oct 09, 2021</td>
                      </tr>
                      <tr>
                      <td>4:51.29</td>
                      <td>2020 Liberty League Championships</td>
                      <td>Feb 19, 2020</td>
                      </tr>
                      <tr>
                      <td>4:52.28</td>
                      <td>2020 Liberty League Championships</td>
                      <td>Feb 19, 2020</td>
                      </tr>
                  </tbody>
                </Table> 
              </div> }
          </div>    
    );
  }
}

export default(EventTimes);
