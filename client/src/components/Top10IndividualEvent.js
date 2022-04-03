import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';
import '../css/alltimetop10.css';

class Top10IndividualEvent extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
      eventname: this.props.eventname,
      eventresults: []
    }
  }

  componentDidMount(){
    var result = this.props.eventlist.find(x => (x[0] === this.state.eventname));
    console.log("arrived");
    this.setState({
      eventresults: result
    });
  }
	
  render() {
    return(
          <div className="event-time">
            <h3>Top 10 Times for {this.state.eventname}</h3>
            <Table bordered>
              <thead>
                  <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Year</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                  <td>1</td>
                  <td>{this.state.eventresults[1][0][0]}</td>
                  <td>{this.state.eventresults[1][0][1]}</td>
                  <td>{this.state.eventresults[1][0][2]}</td>
                  </tr>
                  <tr>
                  <td>2</td>
                  <td>Pat Fell</td>
                  <td>4:36:98</td>
                  <td>2004</td>
                  </tr>
                  <tr>
                  <td>3</td>
                  <td>Nathan Hosking</td>
                  <td>4:39:04</td>
                  <td>2014</td>
                  </tr>
                  <tr>
                  <td>4</td>
                  <td>Ben Fell</td>
                  <td>4:39:46</td>
                  <td>2003</td>
                  </tr>
                  <tr>
                  <td>5</td>
                  <td>Dillon Webster</td>
                  <td>4:41:72</td>
                  <td>2012</td>
                  </tr>
                  <tr>
                  <td>6</td>
                  <td>David James</td>
                  <td>4:42:48</td>
                  <td>2014</td>
                  </tr>
                  <tr>
                  <td>7</td>
                  <td>Daniel Hendricks</td>
                  <td>4:42:84</td>
                  <td>2015</td>
                  </tr>
                  <tr>
                  <td>8</td>
                  <td>Keven Ehrlich</td>
                  <td>4:43:47</td>
                  <td>2010</td>
                  </tr>
                  <tr>
                  <td>9</td>
                  <td>Colin Lenhoff</td>
                  <td>4:43:86</td>
                  <td>2012</td>
                  </tr>
                  <tr>
                  <td>10</td>
                  <td>Robert Unruh</td>
                  <td>4:44:37</td>
                  <td>1993</td>
                  </tr>
              </tbody>
            </Table>
          </div>    
    );
  }
}

export default(Top10IndividualEvent);
