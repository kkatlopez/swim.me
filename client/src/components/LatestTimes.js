import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';

class LatestTimes extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      showLatest: false
    };
    this.showLatest = this.showLatest.bind(this);
  }

  showLatest(event) {
    console.log(event);
    switch (event) {
      case "RPI @ Skidmore":
        this.setState({ showLatest: true });
        break;
      case "":
        this.setState({ showLatest: false });
        break;
    }
  }
	
  render() {
    return(
        <div className="latest">
            <div>
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
                    <td>25.25</td>
                    <td>Oct 21, 2016</td>
                    </tr>
                    <tr>
                    <td>50 L Free</td>
                    <td>26.95</td>
                    <td>Jul 20, 2019</td>
                    </tr>
                    <tr>
                    <td>100 Y Free</td>
                    <td>51.01</td>
                    <td>Dec 03, 2017</td>
                    </tr>
                    <tr>
                    <td>100 L Free</td>
                    <td>56.49</td>
                    <td>Jul 22, 2018</td>
                    </tr>
                    <tr>
                    <td>200 Y Free</td>
                    <td>1:46.19</td>
                    <td>Feb 19, 2018</td>
                    </tr>
                </tbody>
              </Table> 
            </div>
        </div>    
    );
  }
}

export default(LatestTimes);
