import React, { Component, Route } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Container, Form, FormControl, Button, Tabs, Tab } from 'react-bootstrap';
import MeetTimes from './MeetTimes.js';
import FastestTimes from './FastestTimes.js';
import EventTimes from './EventTimes.js';
import Times from './Times.js';
import SwimmerSearch from './SwimmerSearch.js';
import Navigation from "./Navigation.js";
import { Dropdown } from 'semantic-ui-react';
import pkg from 'semantic-ui-react/package.json'
import '../css/timessearch.css';

class TimesSearch extends Component {
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
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push(redirect, { logged: logged, admin: admin, user: user} );
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

  goToTop10() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push("/alltimetop10", { logged: logged, admin: admin, user: user} );
  }

  render() {
    const { showTable } = this.state;
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Times</h1>
        </Container>
        <Container className="px-4">
          <a onClick={() => this.goToTop10()} className="standalone top10-link">
            <p className="my-2">View all-time top 10</p>
          </a>
          <Container className="d-flex justify-content-between mt-3">
            <SwimmerSearch swimmernames={this.state.swimmernames}/>
            <Button onClick={() => this.redirect()}>Show Results</Button>
            <br/>
          </Container>

          {/* {showTable && <Times swimmers={this.state.allswimmerinfo}/>} */}

        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

export default withRouter(TimesSearch);
