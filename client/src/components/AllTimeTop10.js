import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import '../css/alltimetop10.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class AllTimeTop10 extends Component {
	
  constructor(props) {
	super(props);
		
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Times</h1>
        </Container>
        <Container className="px-4">
          <label>Event</label>
          <DropdownButton className="dropdown" title="Select an event" className="pb-3">
            <Dropdown.Item href="#/action-1">W 50 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-2">M 50 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-3">W 100 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-4">M 100 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-5">W 200 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-6">M 200 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-7">W 500 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-8">M 500 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-9">W 1000 Free</Dropdown.Item>
            <Dropdown.Item href="#/action-10">M 1000 Free</Dropdown.Item>
          </DropdownButton>
          <h2>Latest Results</h2>
          <div className="event-time">
          <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Time</th>
                <th>Year</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Trevor Maxfield</td>
                <td>4:35:95</td>
                <td>2020</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Pat Fell</td>
                <td>4:36:98</td>
                <td>2004</td>
                </tr>
                <tr>
                <td>3</td>
                <td>Nathan Hosking</td>
                <td>4:39:04</td>
                <td>2014</td>
                </tr>
                <tr>
                <td>4</td>
                <td>Ben Fell</td>
                <td>4:39:46</td>
                <td>2003</td>
                </tr>
                <tr>
                <td>5</td>
                <td>Dillon Webster</td>
                <td>4:41:72</td>
                <td>2012</td>
                </tr>
                <tr>
                <td>6</td>
                <td>David James</td>
                <td>4:42:48</td>
                <td>2014</td>
                </tr>
                <tr>
                <td>7</td>
                <td>Daniel Hendricks</td>
                <td>4:42:84</td>
                <td>2015</td>
                </tr>
                <tr>
                <td>8</td>
                <td>Keven Ehrlich</td>
                <td>4:43:47</td>
                <td>2010</td>
                </tr>
                <tr>
                <td>9</td>
                <td>Colin Lenhoff</td>
                <td>4:43:86</td>
                <td>2012</td>
                </tr>
                <tr>
                <td>10</td>
                <td>Robert Unruh</td>
                <td>4:44:37</td>
                <td>1993</td>
                </tr>
            </tbody>
            </Table>
          </div>
        </Container>
      </Container>      
    );
  }
}

export default(AllTimeTop10);
