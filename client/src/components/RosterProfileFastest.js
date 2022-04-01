import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Table } from 'react-bootstrap';

class RosterProfileLatest extends Component {
    constructor(props) {
      super(props);
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
                    <th>Date</th>
                    </tr>
                </thead>
            <tbody>
                <tr>
                <td>50 Y Free</td>
                <td>25.08</td>
                <td>Feb 16, 2022</td>
                </tr>
                <tr>
                <td>50 L Free</td>
                <td>29.44</td>
                <td>Jul 14, 2018</td>
                </tr>
                <tr>
                <td>100 Y Free</td>
                <td>55.24</td>
                <td>Feb 22, 2020</td>
                </tr>
                <tr>
                <td>100 L Free</td>
                <td>1:04.08</td>
                <td>Jul 16, 2017</td>
                </tr>
                <tr>
                <td>200 Y Free</td>
                <td>2:01.42</td>
                <td>Feb 21, 2019</td>
                </tr>
            </tbody>
            </Table> 
          </Container>
        </Container>      
      );
    }
  }
  
  export default(RosterProfileLatest);
  