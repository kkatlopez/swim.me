import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card, DropdownButton, Dropdown } from 'react-bootstrap';
import '../css/meetresults.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import MeetCard from "./MeetCard.js";

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
    console.log("hello");
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Meet Results</h1>
        </Container>
        <Container className="px-4">
            {/* <a href="/" className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to all meets</p>
            </a> */}
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
                  return(<MeetCard meetname={lister.meetName} meetdate={lister.meetStartDate}/>)
              })
            }
            {/* <Card className="meet-card">
              <Card.Body className="mt-2">
                  <Card.Title>RPI @ Skidmore</Card.Title>
                  <Card.Subtitle className="text-muted">January 22, 2022</Card.Subtitle>
                  <a href="/meet" className="stretched-link"></a>
              </Card.Body>
            </Card>
            <Card className="meet-card">
              <Card.Body className="mt-2">
                <Card.Title>MIT Invitational</Card.Title>
                <Card.Subtitle className="text-muted">December 3, 2022</Card.Subtitle>
                
              </Card.Body>
            </Card>
            <Card className="meet-card">
              <Card.Body className="mt-2">
                <Card.Title>RPI vs. Vassar College</Card.Title>
                <Card.Subtitle className="text-muted">November 13, 2021</Card.Subtitle>
                
              </Card.Body>
            </Card> */}
          </div>
        </Container>
      </Container>      
    );
  }
}

export default(FrontPage);
