import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import '../css/alltimetop10.css';

class Top10IndividualEvent extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
      eventinfo: this.props.eventinfo
    }
  }
	
  render() {
    return(
          <div className="event-time">
            <h3>Top 10 Times for {this.state.eventinfo[0]}</h3>
            <Table bordered>
              <thead>
                  <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Year</th>
                  </tr>
              </thead>
              {
              this.state.eventinfo.map( (lister, index) => {
                return(
                  <tbody>
                    <tr>
                    <td>{index}</td>
                    <td>{lister[1][0][0]}</td>
                    <td>{lister[1][0][1]}</td>
                    <td>{lister[1][0][2]}</td>
                    </tr>
                  </tbody>)
              }) 
              }
              
            </Table>
          </div>    
    );
  }
}

export default(Top10IndividualEvent);
