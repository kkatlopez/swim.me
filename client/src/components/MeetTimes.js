import React, { Component } from 'react';
import { DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

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

    // redirect to login if not logged in
    if(this.props.location.state === undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged === false){
      this.props.history.push("/", { logged: false });
    }
  }

  // retrieve all swimmer info
  getSwimmer() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.firstName === this.state.firstname && x.lastName === this.state.lastname));
          var sorted = specific_result.meetsSwam.sort(function(a, b) {
            return new Date(a[1]) - new Date(b[1]);
          });
          this.setState({
            times: sorted.reverse(),
            first: this.state.firstname,
            last: this.state.lastname
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

  // retrieve all meet info
  timesTable(info) {
    var link = "http://localhost:3001/meet_info/" + this.state.first + "~" + this.state.last + "~" + info[0] + "~" + info[1];
    fetch(link)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            events: result
          });
        }
    )
  }

  // show/hide for times table
  showMeet(meetinfo) {
    this.timesTable(meetinfo);
    switch(meetinfo) {
      default:
        this.setState({ 
          showMeet: true, 
          meetname: meetinfo[0], 
          startdate: meetinfo[1] 
        });
        break;
    }
  }

  // initialize component before rendering
  componentDidMount(){
    var split = this.props.name.split(' ');
    this.setState({
        firstname: split[0],
        lastname: split[1]
    });
    this.getSwimmer();
  }
	
  render() {
    return(
      <div className="meet">
        <label className="pt-3">Meet</label>
        <DropdownButton className="dropdown pb-3" title="Select a meet">
          {
            this.state.times.map( (lister) => {
                return(<Dropdown.Item meetname={lister} meetstart={lister[1]} onClick={() => this.showMeet(lister)}>{lister[0]} ({moment(lister[1]).format('YYYY')})</Dropdown.Item>)
            })
          }
        </DropdownButton>
        {this.state.showMeet && 
          <div>
            <h2 className="py-2 sectionTitle">{this.state.meetname}</h2>
            <h5 className="sectionTitle">{moment(this.state.startdate).format('ll')}</h5>
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
