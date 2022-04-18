import React, { Component } from 'react';
import { Container, DropdownButton, Dropdown, Table} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/alltimetop10.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
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

    // updates the content of the form whenever there is a change:
	  this.showTable = this.showTable.bind(this);
  }

  // show table when an event is selected from the dropdown
  showTable(eventname) {
    var result = this.state.events.find(x => (x.event[0] === eventname.lister));
    this.setState({ name: eventname.lister, eventresults: result }, function () {
      this.setState({
        showTable: true
      });
    });
    switch (eventname) {
      case (eventname.lister !== ''):
        this.setState({ showTable: true });
        break;
      default:
        this.setState({ showTable: true });
        break;
    }

  }

  // fetch data from database
  populateTop10() {
    fetch("http://localhost:3001/top_10")
      .then(res => res.json())
      .then(
        (result) => {
          var names = [];
          var i;
          for (i = 0; i < result.length; i++) {
            names.push(result[i].event[0]);
          }
          this.setState({
            eventnames: names,
            events: result
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

  // initialize component before rendering
  componentDidMount(){
    this.populateTop10();
  }

  // send props to other components
  backToAllTimes() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
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
                <p className="pb-2"><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to time search</p>
            </a>
          <label>Event</label>
          <DropdownButton className="dropdown pb-3" title="Select an event">
          {
              this.state.eventnames.map( (lister) => {
                  return(<Dropdown.Item onClick={() => this.showTable({lister})}>{lister}</Dropdown.Item>)
              })
          }
          </DropdownButton>
          {showTable &&
            <div className="event-time">
            <h3 className="sectionTitle">Top 10 Times for {this.state.eventresults.event[0]}</h3>
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
                {
                  this.state.eventresults.event[1].map( (lister, index) => {
                    index = index + 1;
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
