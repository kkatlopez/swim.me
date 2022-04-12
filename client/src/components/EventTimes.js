import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/eventtimes.css';

class EventTimes extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.match.params.firstName,
      lastname: this.props.match.params.lastName,
      event: this.props.event,
      eventsswam: []
    };
  }

  getEventsSwam() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          console.log(specific_result);
          var i, j;
          var eventlist = []
          console.log(specific_result.eventsSwam);
          for (i = 0; i < specific_result.eventsSwam.length; i++) {
            eventlist.push(specific_result.eventsSwam[i][0]);
          }
          console.log(eventlist)
          this.setState({
            eventsswam: eventlist
          });
          console.log(this.state.eventsswam);
        }
      )
  }

  showTable(selectedEvent) {
    
  }

  componentDidMount() {
    this.getEventsSwam();
  }
	
  render() {
    return(
          <div className="event">
            {/* <label className="pt-3">Event</label> */}
             {/* <DropdownButton className="dropdown pb-3" title="Select an event"> */}
                {
                  this.state.eventsswam.map( (lister) => {
                    return(<Dropdown.Item event={lister}>{lister}</Dropdown.Item>)
                  })
                }
              {/* </DropdownButton> */}
              {/* <RosterProfileEvent /> */}
            {/* {this.state.showEvent && 
              <div>
                <h2 className="sectionTitle">500 Y Free</h2>
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
              </div> } */}
          </div>    
    );
  }
}

export default withRouter(EventTimes);
