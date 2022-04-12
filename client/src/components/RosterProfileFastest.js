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
        fastest: []
      };
    }

    getSwimmerInfo() {
      fetch("http://localhost:3001/swimmers")
        .then(res => res.json())
        .then(
          (result) => {
            var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
            this.setState({
              fastest: specific_result.bestTimes
            });
          }
        )
    }

    getFastest() {
      fetch("http://localhost:3001/swimmers")
        .then(res => res.json())
        .then(
          (result) => {
            var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
            this.setState({
              fastest: specific_result.bestTimes
            });
          }
        )
    }

    componentDidMount(){
      this.getSwimmerInfo();
      this.getFastest();
    }

    render() {
      return(
        <Container fluid className="page-container">
          <Container className="px-4">
            <Table bordered>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Time</th>
                  <th>Meet</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
              {
                  this.state.fastest.map( (lister) => {
                    return(
                      <tr>
                        <td>{lister[0]}</td>
                        <td>{lister[1]}</td>
                        <td>{lister[2]}</td>
                        <td>{moment(lister[3]).format('l')}</td>
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
  