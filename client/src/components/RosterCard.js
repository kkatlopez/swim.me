import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
//import { Link, withRouter } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';
import '../css/roster.css';

class RosterCard extends Component {
	
    constructor(props) {
      super(props);
      this.state = {
          firstname: this.props.first,
          lastname: this.props.last
        //   ogdate: this.props.meetoriginaldate
        }
    }
      
    render() {
      return(
        <Card className="prof-card">
            <Card.Body className="mt-2">
                <Card.Img variant="top" src="https://picsum.photos/300" />
                <Card.Title>{this.state.firstname} {this.state.lastname}</Card.Title>
                <a href={"/roster/" + this.state.firstname + "-" + this.state.lastname} className="stretched-link"></a>
            </Card.Body>
        </Card>
        // <Card className="prof">
        // <Card.Img variant="top" src="https://rpiathletics.com/images/2021/10/5/Atkins_Hope.jpg?width=300" />
        // <Card.Body>
        //     <Card.Title>Hope Atkins</Card.Title>
        //     <Card.Text>
        //     <div>FR</div>
        //     <div>Sophomore</div>
        //     <div>Golden, CO</div>
        //     </Card.Text>
        // </Card.Body>
        // </Card>   
      );
    }
  }
  
  export default(RosterCard);
  