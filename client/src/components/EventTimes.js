import React, { Component } from 'react';
import { DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/eventtimes.css';
import moment from 'moment';

class EventTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTimes: false,
      eventsswam: [],
      eventtimes: [],
      event: ""
    };
  }

  // retrieve events swam by a swimmer
  getEventsSwam() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          var i;
          var eventlist = []
          for (i = 0; i < specific_result.eventsSwam.length; i++) {
            eventlist.push(specific_result.eventsSwam[i][0]);
          }
          // sorting events in the proper order (using reference to sort eventlist)
          const reference = [ '50 Free', '100 Free', '200 Free', '500 Free', '1000 Free', '1650 Free', '100 Back', '200 Back', '100 Breast', '200 Breast', '100 Fly', '200 Fly', '200 IM', '200 Im', '400 IM', '400 Im' ];
          eventlist.sort(function(a, b) {
            return reference.indexOf(a) - reference.indexOf(b);
          });
          this.setState({
            eventsswam: eventlist
          });
        }
      )
  }

  // get all times for a specific event for a swimmer
  timesTable(eventname) {
    var link = "http://localhost:3001/swimmers/" + this.state.firstname + " " + this.state.lastname + "/event/" + eventname;
    fetch(link)
      .then(res => res.json())
      .then(
        (result) => {
          var times = [];
          var i;
          for (i = 1; i < result[0].length; i++) {
            times.push(result[0][i]);
          }
          this.setState({
            eventtimes: times[0],
            event: result[0]
          });
        }
      )
  }

  // show table when event is selected
  showTimes(info) {
    this.timesTable(info);
    switch(info) {
      default:
        this.setState({
          showTimes: true,
          event: info
        });
        break;
    }
  }

  // initialize component before rendering
  componentDidMount() {
    var split = this.props.name.split(' ');
    this.setState({
      firstname: split[0],
      lastname: split[1]
    });
    this.getEventsSwam();
  }
	
  render() {
    return(
          <div className="event">
            <label className="pt-3">Event</label>
             <DropdownButton className="dropdown pb-3" title="Select an event">
              {
                this.state.eventsswam.map( (lister) => {
                  return(<Dropdown.Item onClick={() => this.showTimes(lister)} event={lister}>{lister}</Dropdown.Item>)
                })
              }
            </DropdownButton>
            {this.state.showTimes && 
              <div>
                <h2 className="sectionTitle">{this.state.event[0]}</h2>
                <Table bordered>
                  <thead>
                      <tr>
                      <th>Time</th>
                      <th>Meet</th>
                      <th>Date</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.eventtimes.reverse().map( (lister, index) => {
                        index = index + 1;
                        return(
                          <tr>
                            <td>{lister[0]}</td>
                            <td>{lister[1]}</td>
                            <td>{moment(lister[2]).format('l')}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table> 
              </div> }
          </div>    
    );
  }
}

export default withRouter(EventTimes);
