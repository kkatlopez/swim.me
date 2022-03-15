import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import '../css/alltimetop10.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class MeetTimes extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      showLatest: false
    };
    this.showLatest = this.showLatest.bind(this);
  }

  showLatest(event) {
    console.log(event);
    switch (event) {
      case "RPI @ Skidmore":
        this.setState({ showLatest: true });
        break;
      case "":
        this.setState({ showLatest: false });
        break;
    }
  }
	
  render() {
    return(
          <div className="meet">
            <label className="pt-3">Meet</label>
            <DropdownButton className="dropdown pb-3" title="Select a meet">
              <Dropdown.Item onClick={() => this.showLatest("")}>-</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.showLatest("RPI @ Skidmore")}>RPI @ Skidmore</Dropdown.Item>
              <Dropdown.Item href="#">MIT Invitational</Dropdown.Item>
              <Dropdown.Item href="#">RPI vs. Vassar College</Dropdown.Item>
            </DropdownButton>
            {this.state.showLatest && 
              <div>
                <h2>RPI @ Skidmore</h2>
                <Table bordered>
                  <thead>
                      <tr>
                      <th>Event</th>
                      <th>Time</th>
                      <th>Place</th>
                      <th>Imp.</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                      <td>1000 Y Free</td>
                      <td>10:06.50</td>
                      <td>3rd</td>
                      <td>-1.9%</td>
                      </tr>
                      <tr>
                      <td>500 Y Free</td>
                      <td>4:55.52</td>
                      <td>1st</td>
                      <td>-0.2%</td>
                      </tr>
                  </tbody>
                </Table> 
                </div> }
          </div>    
    );
  }
}

export default(MeetTimes);
