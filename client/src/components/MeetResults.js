import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown } from 'react-bootstrap';
import '../css/meetresults.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MeetCard from "./MeetCard.js";
import moment from 'moment';

class FrontPage extends Component {
	
  constructor(props) {
	super(props);
  this.state = {
    meetlist: [],
    dropdownlist: []
  }
  }

  //AJAX Calls
  populateMeet() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            meetlist: result,
            dropdownlist: [result[0], result[1],result[2],result[3],result[4],result[5],result[6],result[7],result[8],result[9],result[10]]
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
    this.populateMeet();
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Meet Results</h1>
        </Container>
        <Container className="px-4">
          <label>Meet</label>
          <DropdownButton className="dropdown pb-3" title="Select a meet">
            {
              this.state.dropdownlist.map( (lister) => {
                  return(<Dropdown.Item href={"/meet/" + lister.meetName}>{lister.meetName}</Dropdown.Item>)
              })
            }

          </DropdownButton>
          <h2>Latest Results</h2>
          <div className="meet-cards">
            {
              this.state.meetlist.map( (lister) => {
                  return(<MeetCard meetname={lister.meetName} meetdate={moment(lister.meetStartDate).format('ll')} meetoriginaldate={lister.meetStartDate}/>)
              })
            }

          </div>
        </Container>
      </Container>      
    );
  }
}

export default(FrontPage);
