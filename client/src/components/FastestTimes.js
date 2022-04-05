import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import moment from 'moment';

class FastestTimes extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      timesordered: []
    };
  }

  populateEvents() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          this.setState({
            times: specific_result.bestTimes
          });
          console.log(this.state.times);
          // console.log(specific_result);
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
