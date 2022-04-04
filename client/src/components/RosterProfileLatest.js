import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Table } from 'react-bootstrap';

class RosterProfileLatest extends Component {
    constructor(props) {
      super(props);
      this.state = {
        latesttimes: this.props.latestresults
      };
      console.log(this.state.latesttimes);
      console.log(this.props.latestresults)
    }

    getLatestTimes() {
      this.setState({
        latesttimes: this.props.latest
      });
      console.log('getlatest');
      console.log(this.props.latestresults);
      console.log(this.state.latesttimes);
    }

    componentDidMount(){
      this.getLatestTimes();
      console.log('hello');
      console.log(this.state.latesttimes);
    }

    render() {
      return(
        <Container fluid className="page-container">
            <h2 className="sectionTitle">RPI @ Skidmore</h2>
            <p class="text-muted">January 22, 2022</p>
          <Container className="px-4">
          <Table bordered>
                  <thead>
                      <tr>
                      <th>Event</th>
                      <th>Time</th>
                      <th>Place</th>
                      <th>Imp.</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                      <td>100 Y Free</td>
                      <td>57.98</td>
                      <td>8th</td>
                      <td>-2.2%</td>
                      </tr>
                      <tr>
                      <td>50 Y Back</td>
                      <td>29.15 (R)</td>
                      <td>–</td>
                      <td>-1.4%</td>
                      </tr>
                      <tr>
                      <td>100 Y Back</td>
                      <td>1:02.51</td>
                      <td>3rd</td>
                      <td>-2.1%</td>
                      </tr>
                      <tr>
                      <td>200 Y IM</td>
                      <td>2:25.01</td>
                      <td>7th</td>
                      <td>-0.5%</td>
                      </tr>
                  </tbody>
                </Table> 
          </Container>
        </Container>      
      );
    }
  }
  
  export default(RosterProfileLatest);
  