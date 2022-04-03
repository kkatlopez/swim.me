import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class MeetTimes extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      meetlist: [],
      times: [],
      events: [],
      first: "",
      last: "",
      meetname: "",
      date: "",
      showMeet: false
    };
    if(this.props.location.state == undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged == false){
      this.props.history.push("/", { logged: false });
    }
  }

  // finding swimmer:
  getSwimmer() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          console.log(specific_result);
          this.setState({
            times: specific_result.meetsSwam,
            first: this.state.firstname,
            last: this.state.lastname
          });
          console.log(specific_result.meetsSwam);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  // get times for table:
  timesTable(info) {
    //console.log(info);
    var link = "http://localhost:3001/meet_info/" + this.state.first + "~" + this.state.last + "~" + info[0] + "~" + info[1];
    //console.log(link);
    fetch(link)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            events: result
          });
          console.log(result);
        }
    )
  }

  // show meet table:
  showMeet(meetinfo) {
    this.timesTable(meetinfo)
    //console.log(meetinfo);
    switch(meetinfo) {
      // case (meetinfo != ''):
      //     this.setState({ showMeet: true });
      //     break;
      default:
          this.setState({ showMeet: true, meetname: meetinfo[0] });
          break;
    }
  }

  componentDidMount(){
    var split = this.props.name.split(' ');
    this.setState({
        firstname: split[0],
        lastname: split[1]
    });
    this.getSwimmer();
    // this.timesTable();
  }
	
  render() {
    return(
          <div className="meet">
            <label className="pt-3">Meet</label>
            <DropdownButton className="dropdown pb-3" title="Select a meet">
              {
                this.state.times.map( (lister) => {
                    return(<Dropdown.Item meetname={lister} meetstart={lister[1]} onClick={() => this.showMeet(lister)}>{lister[0]} </Dropdown.Item>)
                })
              }
            </DropdownButton>
            {this.state.showMeet && 
              <div>
                <h2 className="py-2">{this.state.meetname}</h2>
                <Table bordered>
                  <thead>
                      <tr>
                      <th>Event</th>
                      <th>Time</th>
                      <th>Place</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.events.map( (lister) => {
                        return(
                          <tr>
                            <td>{lister[0]}</td>
                            <td>{lister[1]}</td>
                            <td>{lister[2]}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table> 
                </div> }
          </div>    
    );
  }
}

export default withRouter(MeetTimes);
