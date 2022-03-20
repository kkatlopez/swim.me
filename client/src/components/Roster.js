import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Link, withRouter } from 'react-router-dom';
import { Container, Form, FormControl, Button, Card } from 'react-bootstrap';
import '../css/roster.css';
import RosterCard from './RosterCard.js';
import { useState } from "react";

class Roster extends Component {
  constructor(props) {
	super(props);
  this.state = {
    currentswimmers: [],
    resultfound: false
  };
  }

  populateProfiles() {
    fetch("http://localhost:3001/swimmers")
      .then(res => res.json())
      .then(
        (result) => {
          var allswimmers = result;
          // console.log(allswimmers);
          var i;
          var swimmerlist = [];
          for (i = 0; i < allswimmers.length; i++) {
            if (allswimmers[i].seasonsSwam.includes("2021-2022") == true) {
              swimmerlist.push(allswimmers[i]);
            }
          }
          // console.log(swimmerlist);
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

  componentDidMount() {
    this.populateProfiles();
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Roster</h1>
        </Container>
        <Container className="px-4">
          <Form className="pb-3">
            {/* !!!!!! IMPLEMENT SEARCH FUNCTION: !!!!!! */}
            <label>Search for a swimmer</label>
            <div className="d-flex">
              <FormControl
                type="search"
                placeholder="Enter a name"
                className="me-2"
                aria-label="Search"
                />
                <Button>Search</Button>   
              </div>
            </Form>
        </Container>
        <Container fluid className="d-flex flex-wrap justify-content-center">
          {
            this.state.currentswimmers.map( (lister) => {
              return(<RosterCard first={lister.firstName} last={lister.lastName}/>)
            })
          }
        </Container>
      </Container>   
    );
  }
}

export default(Roster);
