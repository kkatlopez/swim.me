import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown } from 'react-bootstrap';
import '../css/specificmeet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import SpecificMeetCard from './SpecificMeetCard';
import moment from 'moment';

class SpecificMeet extends Component {
	
  constructor(props) {
	super(props);
    this.state = {
        name: "",
        date: "",
        eventlist: [],
        eventname: [],
      }
  }

  populateEvents() {
    fetch("http://localhost:3001/meet_info")
      .then(res => res.json())
      .then(
        (result) => {
          var specific_result = result.find(x => (x.meetName === this.state.name && x.meetStartDate === this.state.date));
          var namelist = [];
          var i;
          for (i = 0; i < specific_result.meetEvents.length; i++) {
            if (specific_result.meetEvents[i][1].length == 0) {
              continue;
            } else {
              namelist.push(specific_result.meetEvents[i][0]);
            }
          }
          this.setState({
            eventlist: specific_result.meetEvents,
            eventname: namelist
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
    var split = this.props.match.params.meetName.split('_');
    this.setState({
        name: split[0],
        date: split[1]
    })
    this.populateEvents();
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Meet Results</h1>
        </Container>
        <Container className="px-4">
            <a href="/" className="standalone">
                <p><FontAwesomeIcon icon={faChevronLeft} className="px-0"/> Back to all meets</p>
            </a>
            <h2>{this.state.name}</h2>
            <p class="text-muted">{moment(this.state.date).format('ll')}</p>

            <label>Event</label>
            <DropdownButton className="dropdown pb-3" title="Select an event">
            {
              this.state.eventname.map( (lister) => {
                // console.log((lister.eventlist)[0]);
                  //console.log(lister);
                  return(<Dropdown.Item href={"/meet/" + this.props.match.params.meetName + "/event/" + lister} eventinfo = {this.state.eventlist}>{lister}</Dropdown.Item>)
              }) 
            }
            
            </DropdownButton> 

            <div className="specific-meet-cards">
            {
              this.state.eventname.map( (lister) => {
                  return(<SpecificMeetCard eventlink={"/meet/" + this.props.match.params.meetName + "/event/" + lister} eventnameslist={this.state.eventname} eventname={lister} eventinfo={this.state.eventlist}>{lister}</SpecificMeetCard>)
              })
            }
            </div>
            
        </Container>
      </Container>      
    );
  }
}

export default(SpecificMeet);
