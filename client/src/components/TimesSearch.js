import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, FormControl, Button, Tabs, Tab } from 'react-bootstrap';
import MeetTimes from './MeetTimes.js';
import FastestTimes from './FastestTimes.js';
import EventTimes from './EventTimes.js';
import Times from './Times.js';
import SwimmerSearch from './SwimmerSearch.js';
import { Dropdown } from 'semantic-ui-react';
import pkg from 'semantic-ui-react/package.json'

class TimesSearch extends Component {
  constructor(props) {
	super(props);
    this.state = {
        swimmernames: [],
        allswimmerinfo: [],
        showTable: false,
        query: ""
    };
    this.showTable = this.showTable.bind(this);
    }

  showTable(event) {
    // var node = document.getElementsByClassName('divider text')[0];
    // var a = ReactDOM.findDOMNode(node);
    // console.log(a.textContent);

    // var splitname = a.textContent.split(" ");
    // var specific_result = this.state.allswimmerinfo.find(x => (x.firstName === splitname[0] && x.lastName === splitname[1]));
    // console.log(specific_result);
    // var d = specific_result.bestTimes;
    // var b = specific_result.meetsSwam;
    // var c = specific_result.eventsSwam;
    // console.log(d);
    // console.log(b);
    // console.log(c);

    // this.setState({
    //   fastestTimes: d,
    //   meetsSwam: b,
    //   eventsSwam: c
    // });
    // console.log(this.state.meetsSwam);
    //console.log(event);
    this.setState({ showTable: true });
  }

  getSwimmerTimes() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var i;
          var swimmerlist = [];
          var name = "";
          for (i = 0; i < result.length; i++) {
            name = result[i].firstName + " " + result[i].lastName;
            swimmerlist.push(name);
          }
          console.log(swimmerlist);
          this.setState({
            allswimmerinfo: result,
            swimmernames: swimmerlist
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
    this.getSwimmerTimes();
  }

  render() {
    const { showTable } = this.state;
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Times</h1>
        </Container>
        <Container className="px-4">
        <br/>
        <SwimmerSearch swimmernames={this.state.swimmernames}/>
        <Button onClick={() => this.showTable("")}>Show Results</Button>
        <br/>
        {showTable && <Times swimmers={this.state.allswimmerinfo}/>}

        </Container>
      </Container>      
    );
  }
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default(TimesSearch);
