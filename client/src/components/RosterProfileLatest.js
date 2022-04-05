import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class RosterProfileLatest extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstname: this.props.match.params.firstName,
        lastname: this.props.match.params.lastName,
        fullname: this.props.match.params.firstName + " " + this.props.match.params.lastName,
        latestresults: [],
        latestmeet: []
      };
    }

    getSwimmerInfo() {
      fetch("http://localhost:3001/swimmers")
        .then(res => res.json())
        .then(
          (result) => {
            var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
            this.setState({
              latestmeet: specific_result.meetsSwam.at(-1),
              fullname: this.state.firstname + " " + this.state.lastname
            });
          }
        )
    }

    getLatestMeet(latestmeet, fullname) {
      fetch("http://localhost:3001/meet_info")
        .then(res => res.json())
        .then(
          (result) => {
            var specific_result = result.find(x => (x.meetName === this.state.latestmeet[0] && x.meetStartDate === this.state.latestmeet[1]));
            var i, j, k, l;
            var latest = [];
            for (i = 0; i < specific_result.meetEvents.length; i++) {
              for (j = 0; j < specific_result.meetEvents[i].length; j++) {
                for (k = 0; k < specific_result.meetEvents[i][j].length; k++) {
                  if (specific_result.meetEvents[i][j][k][0] === this.state.fullname) {                  
                    latest.push( [specific_result.meetEvents[i][0], specific_result.meetEvents[i][j][k][1], (k+1)] );
                  }
                }
              }
            }
            this.setState({
              latestresults: latest
            });
          }
        )
    }

    componentDidMount(){
      this.getSwimmerInfo();
      this.getLatestMeet(this.state.latestmeet, this.state.fullname);
    }

    render() {
      return(
        <Container fluid className="page-container">
          <Container className="px-4">
          <h2 className="sectionTitle">{this.state.latestmeet[0]}</h2>
            <p class="text-muted">{moment(this.state.latestmeet[1]).format('ll')}</p>
            <Table bordered>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Time</th>
                  <th>Place</th>
                </tr>
              </thead>
              <tbody>
              {
                  this.state.latestresults.map( (lister) => {
                    return(
                      <tr>
                        <td>{lister[0]}</td>
                        <td>{lister[1]}</td>
                        <td>{lister[2]}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Container>
        </Container>      
      );
    }
  }
  
  export default withRouter(RosterProfileLatest);
  