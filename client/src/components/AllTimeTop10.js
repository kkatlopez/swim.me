import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/alltimetop10.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Top10IndividualEvent from './Top10IndividualEvent.js';
import Navigation from './Navigation.js';

class AllTimeTop10 extends Component {

  constructor(props) {
		super(props);
	  this.state = {
	    eventnames: [],
      eventresults: [],
      name: '',
      events: [],
	    showTable: false
	  };
	  this.showTable = this.showTable.bind(this);
		// if(this.props.location.state == undefined){
		// 	this.props.history.push("/", { logged: false });
		// }
		// else if (!('logged' in this.props.location.state)){
		// 	this.props.history.push("/", { logged: false });
		// }
		// else if(this.props.location.state.logged == false){
		// 	this.props.history.push("/", { logged: false });
		// }
  }



  showTable(eventname) {
    console.log(eventname.lister);
    var result = this.state.events.find(x => (x.event[0] === eventname.lister));
    console.log(result);
    // this.setState({
    //   name: eventname.lister,
    //   eventresults: result,
    //   showTable: true
    // });

    this.setState({ name: eventname.lister, eventresults: result }, function () {
      console.log(this.state.eventresults);
      this.setState({
        showTable: true
      });
    });
    switch (eventname) {
      case (eventname.lister != ''):
        console.log("check");
        this.setState({ showTable: true });
        break;
      case "":
        console.log("check");
        this.setState({ showTable: true });
        break;
    }

  }

  populateTop10() {
    fetch("http://localhost:3001/top_10")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var names = [];
          var i;
          for (i = 0; i < result.length; i++) {
            names.push(result[i].event[0]);
          }
          this.setState({
            eventnames: names,
            events: result
          });
          console.log(names);
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
    console.log("hello");
    this.populateTop10();
  }

  backToAllTimes() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/times", { logged: logged, admin: admin, user: user} );
  }

  render() {
    const { showTable } = this.state;
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">All-Time Top 10</h1>
        </Container>
        <Container className="px-4">
          <a onClick={() => this.backToAllTimes()} className="standalone back-link">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to time search</p>
            </a>
          <label>Event</label>
          <DropdownButton className="dropdown pb-3" title="Select an event">
          {
              this.state.eventnames.map( (lister) => {
                  return(<Dropdown.Item onClick={() => this.showTable({lister})}>{lister}</Dropdown.Item>)
              })
          }
          </DropdownButton>

          {/* {showTable && <Top10IndividualEvent eventinfo = {this.state.eventresults}/>} */}

          {showTable &&
            <div className="event-time">
            <h3>Top 10 Times for {this.state.eventresults.event[0]}</h3>
            <Table bordered>
              <thead>
                  <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Year</th>
                  </tr>
              </thead>
              {/* <tbody>
                      <tr>
                      <td>1</td>
                      <td>{this.state.eventresults.event[1][0][0]}</td>
                      <td>{this.state.eventresults.event[1][0][1]}</td>
                      <td>{this.state.eventresults.event[1][0][2]}</td>
                      </tr>
                    </tbody> */}

                    <tbody>
              {
                this.state.eventresults.event[1].map( (lister, index) => {
                  var index = index + 1;
                  return(

                      <tr>
                      <td>{index}</td>
                      <td>{lister[0]}</td>
                      <td>{lister[1]}</td>
                      <td>{lister[2]}</td>
                      </tr>
                    )

                })
              }
              </tbody>
            </Table>
          </div>
          }

        </Container>
        <Navigation/>
      </Container>
    );
  }
}

export default withRouter(AllTimeTop10);
