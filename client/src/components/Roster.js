import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import { Link, withRouter } from 'react-router-dom';
import { Container, Form, FormControl, Button, Card, List } from 'react-bootstrap';
import '../css/roster.css';

// import '../css/frontpage.css';

class FrontPage extends Component {
	
  constructor(props) {
	super(props);
		
  }
	
  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Roster</h1>
        </Container>
        <Container className="px-4">
          <Form className="pb-3">
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
        <Container className="d-flex flex-wrap justify-content-center full-roster">
          <Card className="prof">
            <Card.Img variant="top" src="https://rpiathletics.com/images/2021/10/5/Atkins_Hope.jpg?width=300" />
            <Card.Body>
              <Card.Title>Hope Atkins</Card.Title>
              <Card.Text>
                <div>FR</div>
                <div>Sophomore</div>
                <div>Golden, CO</div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="prof">
            <Card.Img variant="top" src="https://rpiathletics.com/images/2021/10/5/Beaulieu_Megan.jpg?width=300" />
            <Card.Body>
              <Card.Title>Megan Beaulieu</Card.Title>
              <Card.Text>
                <div>BK/IM</div>
                <div>Senior</div>
                <div>San Jose, CA</div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="prof">
            <Card.Img variant="top" src="https://rpiathletics.com/images/2021/10/5/Brown_Shannon.jpg?width=300"/>
            <Card.Body>
              <Card.Title>Shannon Brown</Card.Title>
              <Card.Text>
                <div>FR/IM</div>
                <div>Freshman</div>
                <div>Pasadena, MD</div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="prof">
            <Card.Img variant="top" src="https://rpiathletics.com/images/2021/10/5/Cahill_Alyssa.jpg?width=300" />
            <Card.Body>
              <Card.Title>Alyssa Cahill</Card.Title>
              <Card.Text>
                <div>BK</div>
                <div>Junior</div>
                <div>Bridgewater, NJ</div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="prof">
            <Card.Img variant="top" src="https://rpiathletics.com/images/2021/10/5/Yuen_Gwyneth.jpg?width=300" />
            <Card.Body>
              <Card.Title>Gwyneth Yuen</Card.Title>
              <Card.Text>
                <div>BK/FR</div>
                <div>Senior</div>
                <div>Princeton Jct., NJ</div>
              </Card.Text>
            </Card.Body>
            <a href="/" className="stretched-link"></a>
          </Card>
        </Container>
      </Container>   
    );
  }
}

export default(FrontPage);
