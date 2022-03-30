import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { DropdownButton, Dropdown, Table } from 'react-bootstrap';

class MeetTimes extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      meetlist: [],
      times: []
    };
  }

  populateEvents() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          this.setState({
            times: specific_result.meetsSwam
          });
          console.log(this.state.times);
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

  // showMeet(meet) {
  //   console.log(event);
  //   switch (event) {
  //     default:
  //       this.setState({ showLatest: false });
  //       break;
  //   }
  // }
	
  render() {
    return(
          <div className="meet">
            <label className="pt-3">Meet</label>
            <DropdownButton className="dropdown pb-3" title="Select a meet">
              {/* <Dropdown.Item onClick={() => this.showLatest("")}>-</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.showLatest("RPI @ Skidmore")}>RPI @ Skidmore</Dropdown.Item>
              <Dropdown.Item href="#">MIT Invitational</Dropdown.Item>
              <Dropdown.Item href="#">RPI vs. Vassar College</Dropdown.Item> */}
              {
                this.state.times.map( (lister) => {
                    return(<Dropdown.Item onClick={() => this.showMeet()}>{lister[0]}</Dropdown.Item>)
                })
              }


            </DropdownButton>
            {this.state.showLatest && 
              <div>
                <h2>RPI @ Skidmore</h2>
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
                      <td>1000 Y Free</td>
                      <td>10:06.50</td>
                      <td>3rd</td>
                      <td>-1.9%</td>
                      </tr>
                      <tr>
                      <td>500 Y Free</td>
                      <td>4:55.52</td>
                      <td>1st</td>
                      <td>-0.2%</td>
                      </tr>
                  </tbody>
                </Table> 
                </div> }
          </div>    
    );
  }
}

export default(MeetTimes);
