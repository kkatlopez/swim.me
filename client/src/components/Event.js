import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/event.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';

class Event extends Component {
	
  constructor(props) {
	super(props);
    // if(this.props.location.state == undefined){
    //   this.props.history.push("/", { logged: false });
    // }
    // else if (!('logged' in this.props.location.state)){
    //   this.props.history.push("/", { logged: false });
    // }
    // else if(this.props.location.state.logged == false){
    //   this.props.history.push("/", { logged: false });
    // }
    this.state = {
      name: this.props.match.params.eventName,
      meetname: "",
      meetdate: "",
      results: []
    }
  }

  // use populateEvents() from SpecificMeet.js 
  showResultTable() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var split = this.props.match.params.meetName.split('_');
          console.log(split); // ok
          console.log(this.state.name);
          var meet = split[0];
          var date = split[1];
          var specific_result = result.find(x => (x.meetName === meet && x.meetStartDate === date));
          console.log(specific_result);
          var i;
          var eventresults = [];
          console.log(specific_result);
          for (i = 0; i < specific_result.meetEvents.length; i++) {
            if (specific_result.meetEvents[i][0] == this.state.name) {
              eventresults = specific_result.meetEvents[i];
            }
          }
          this.setState({
            results: eventresults[1],
            meetname: meet,
            meetdate: date
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
  
  componentDidMount(){
    // var event = this.props.match.params.eventName;
    // console.log(event);
    // var split = this.props.match.params.meetName.split('_');
    // var meetName = this.props.match.params.meetname;
    // var meetDate = this.props.match.params.meetdate;
    // console.log(split);
    // this.setState({
    //   meetname: split[0],
    //   meetdate: split[1]
    // })
    // console.log(this.state.name);
    // console.log(this.state.meetname);
    // console.log(this.state.meetdate);
    this.showResultTable();
  }

  sendProps() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/meet/"+ this.state.meetname + "_" + this.state.meetdate, { logged: logged, admin: admin, user: user} );
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Event Results</h1>
        </Container>
        <Container className="px-4">
        {/* href={"/meet/" + this.props.match.params.meetName} */}
            <a onClick={() => this.sendProps()} className="standalone meet-link">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to meet</p>
            </a>
            <h2 className="sectionTitle">{this.state.name}</h2>            
            <div className="event">
                <Table bordered>
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.results.map( (lister) => {
                      return(
                        <tr>
                          <td>{lister[0]}</td>
                          <td>{lister[1]}</td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
            </div>

        </Container>
      </Container>
    );
  }
}

export default withRouter(Event);