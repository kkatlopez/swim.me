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

  componentDidMount(){
    
    this.setState({ times: this.props.best });
    console.log(this.state.best);
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
