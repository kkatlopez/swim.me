import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, Card, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import '../css/alltimetop10.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

class Top10IndividualEvent extends Component {
	
  constructor(props) {
	super(props);
		
  }
	
  render() {
    return(
          <div className="event-time">
            <h3>Top 10 Times for M 500 Free</h3>
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
    );
  }
}

export default(Top10IndividualEvent);
