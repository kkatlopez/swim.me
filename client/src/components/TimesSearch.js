import React, { Component, Route } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
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
        //showTable: false,
        query: "",
    };
    //this.showTable = this.showTable.bind(this);
    }


  redirect() {
    var node = document.getElementsByClassName('divider text')[0];
    var a = ReactDOM.findDOMNode(node);
    console.log(a.textContent);
    var redirect = "/times/" + a.textContent;
    this.props.history.push(redirect);
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
        <Button onClick={() => this.redirect()}>Show Results</Button>
        <br/>
        {/* {showTable && <Times swimmers={this.state.allswimmerinfo}/>} */}

        </Container>
      </Container>      
    );
  }
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default withRouter(TimesSearch);
