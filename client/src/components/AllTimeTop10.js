import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import '../css/alltimetop10.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Top10IndividualEvent from './Top10IndividualEvent.js';

class AllTimeTop10 extends Component {

  constructor(props) {
		super(props);
	  this.state = {
	    eventnames: [],
      selected: '',
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
    this.setState({
      selected: eventname.lister
    });
    switch (eventname.lister) {
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

  render() {
    const { showTable } = this.state;
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Times</h1>
        </Container>
        <Container className="px-4">
          <a href="/" className="standalone">
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

          {showTable && <Top10IndividualEvent eventname = {this.state.selected} eventlist = {this.state.events}/>}

        </Container>
      </Container>
    );
  }
}

export default (AllTimeTop10);
