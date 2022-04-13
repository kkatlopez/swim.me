import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import moment from 'moment';

class FastestTimes extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      times: []
    };
  }

  populateEvents() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          const reference = [ '50 Free', '100 Free', '200 Free', '500 Free', '1000 Free', '1650 Free', '100 Back', '200 Back', '100 Breast', '200 Breast', '100 Fly', '200 Fly', '200 IM', '200 Im', '400 IM', '400 Im' ];
          specific_result.bestTimes.sort(function(a, b) {
            return reference.indexOf(a[0]) - reference.indexOf(b[0]);
          });
          this.setState({
            times: specific_result.bestTimes
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

  componentDidMount(){
    var split = this.props.name.split(' ');
    console.log(split);
    this.setState({
      firstname: split[0],
      lastname: split[1]
    });
    this.populateEvents();
  }

  render() {
    return(
        <div className="latest">
          <div className="event">
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
                    this.state.times.map( (lister) => {
                      return(
                        <tr>
                          <td>{lister[0]}</td>
                          <td>{lister[1]}</td>
                          <td>{lister[2]}</td>
                          <td>{moment(lister[3]).format('ll')}</td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
            </div>
        </div>    
    );
  }
}

export default(FastestTimes);
