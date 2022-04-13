import React, { Component } from 'react';
import { Container, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

class RosterProfileLatest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.match.params.firstName,
      lastname: this.props.match.params.lastName,
      showTimes: false,
      eventsswam: [],
      eventtimes: [],
      event: ""
    };
  }

  getSwimmerInfo() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          this.setState({
            year: specific_result.classYear,
            hs: specific_result.highSchool,
            hometown: specific_result.hometown,
            strokes: specific_result.position,
            latestmeet: specific_result.meetsSwam.at(-1),
            fullname: this.state.firstname + " " + this.state.lastname
          })
        }
      )
  }

  getEventsSwam() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          var i, j;
          var eventlist = []
          // this works:
          console.log(specific_result.meetsSwam);
          for (i = 0; i < specific_result.eventsSwam.length; i++) {
            eventlist.push(specific_result.eventsSwam[i][0]);
          }
          const reference = [ '50 Free', '100 Free', '200 Free', '500 Free', '1000 Free', '1650 Free', '100 Back', '200 Back', '100 Breast', '200 Breast', '100 Fly', '200 Fly', '200 IM', '200 Im', '400 IM', '400 Im' ];
          eventlist.sort(function(a, b) {
            return reference.indexOf(a) - reference.indexOf(b);
          });
          console.log(eventlist);

          this.setState({
            eventsswam: eventlist
          });
        }
      )
  }
  

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

  componentDidMount() {
    this.getEventsSwam();
    this.getSwimmerInfo();
  }

  render() {
    return(
      <Container fluid className="page-container px-4">
          <label>Event</label>
          <DropdownButton className="dropdown pb-3" title="Select an event">
              {
                this.state.eventsswam.map( (lister) => {
                  return(<Dropdown.Item onClick={() => this.showTimes(lister)} event={lister}>{lister}</Dropdown.Item>)
                })
              }
            </DropdownButton>
            {this.state.showTimes &&
              <div className="event dynamic-height">
                <h2 className="sectionTitle">{this.state.event[0]}</h2>
                <Table borderd>
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
                        var index = index + 1;
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
              </div>
            }
      </Container>      
    );
  }
}
  
  export default withRouter(RosterProfileLatest);
  