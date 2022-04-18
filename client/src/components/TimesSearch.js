import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import SwimmerSearch from './SwimmerSearch.js';
import Navigation from "./Navigation.js";
import '../css/timessearch.css';

class TimesSearch extends Component {
  constructor(props) {
	super(props);
  this.state = {
      swimmernames: [],
      allswimmerinfo: [],
      query: "",
  };
  }

  // send props to other admin components
  redirect() {
    var node = document.getElementsByClassName('divider text')[0];
    var a = ReactDOM.findDOMNode(node);
    var redirect = "/times/" + a.textContent;
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push(redirect, { logged: logged, admin: admin, user: user} );
  }

  // retrieve swimmer times info
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

  // initialize component before rendering
  componentDidMount(){
    this.getSwimmerTimes();
  }

  // send props to other admin components
  goToTop10() {
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.admin;
    var user = this.props.location.state.user;
    this.props.history.push("/alltimetop10", { logged: logged, admin: admin, user: user} );
  }

  render() {
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
