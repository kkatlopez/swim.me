import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Container, Button } from 'react-bootstrap';
import '../css/roster.css';
import RosterCard from './RosterCard.js';
import Navigation from "./Navigation.js";
import RosterSearch from './RosterSearch.js';

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentswimmers: []
    };

    // redirect to login if not logged in
    if(this.props.location.state === undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged === false){
      this.props.history.push("/", { logged: false });
    }
  }

  // retrieve all swimmer info and identify only current season swimmers
  populateProfiles() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var allswimmers = result;
          var i;
          var swimmerlist = [];
          for (i = 0; i < allswimmers.length; i++) {
            if (allswimmers[i].seasonsSwam.includes("2021-2022") === true) {
              swimmerlist.push(allswimmers[i]);
            }
          }
          this.setState({
            currentswimmers: swimmerlist
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

  // send props to other admin components
  redirect() {
    var node = document.getElementsByClassName('divider text')[0];
    var a = ReactDOM.findDOMNode(node);
    var name = a.textContent.split(" ");
    var redirect;
    if (name.length === 2) {
      redirect = "/roster/" + name[0] + "-" + name[1];
    } else {
      redirect = "/roster/" + name[0] + "-" + name[1] + " " + name[2];
    }
    var logged = this.props.location.state.logged;
    var admin = this.props.location.state.adin
    var user = this.props.location.state.user;
    this.props.history.push(redirect, { logged: logged, admin: admin, user: user} );
  }

  // initialize component before rendering
  componentDidMount() {
    this.populateProfiles();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Roster</h1>
        </Container>
        <Container>
          <Container className="d-flex justify-content-around my-3 px-0">
            
            <RosterSearch swimmernames={this.state.currentswimmers}/>
            <Button onClick={() => this.redirect()}>Show Results</Button>
            <br/>
          </Container>
        </Container>
        <Container fluid className="d-flex flex-wrap justify-content-center dynamic-height mx-0">
          {
            this.state.currentswimmers.map( (lister) => {
              return(<RosterCard first={lister.firstName} last={lister.lastName} year={lister.classYear} hs={lister.highSchool} hometown={lister.hometown} strokes={lister.position} img={lister.picture} />)
            })
          }
        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>
    );
  }
}

export default withRouter(Roster);
