import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Container, DropdownButton, Dropdown, Card, Accordion } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
// import '../css/meetresults.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Navigation from "./Navigation.js";
import moment from 'moment';

class AlertsAndCalendar extends Component {

  constructor(props) {
    super(props);
    if(this.props.location.state == undefined){
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)){
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged == false){
      this.props.history.push("/", { logged: false });
    }
    this.state = {
      alertList: [],
      // meetlist: [],
      // dropdownlist: [],
      logged: this.props.location.state.logged,
      admin: this.props.location.state.admin,
      user: this.props.location.state.user
    }

    this.getBackground = this.getBackground.bind(this);
    this.textString = this.textString.bind(this);
  }

  //AJAX Calls
  populateAlerts() {
    console.log("hello populate");
    fetch("http://localhost:3001/alert_info")
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
          this.setState({
            alertList: result
          //   meetlist: result,
          //   dropdownlist: [result[0], result[1],result[2],result[3],result[4],result[5],result[6],result[7],result[8],result[9],result[10]]
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
    console.log("component mount");
    this.populateAlerts();
  }

  // sendProps(lister) {
  //   var logged = this.props.location.state.logged;
  //   var admin = this.props.location.state.adin
  //   var user = this.props.location.state.user;
  //   this.props.history.push("/meet/"+ lister.meetName + "_" + lister.meetStartDate, { logged: logged, admin: admin, user: user} );
  // }

  textString = function(lister) {
    var atype = lister.alert_type;
    var date = lister.alert_end_date;
    var text = lister.alert_text;

    var return_str = "";
    if(atype != "Info") {
      return_str += date.substring(5,7) + "/" + date.substring(8,10) + " - ";
    }

    return_str += text;
    return return_str
  }

  getBackground = function(atype) {
    if(atype == "Immediate") {
      return "danger";
    }
    else if(atype == "High") {
      return "secondary";
    }
    else if(atype == "Medium") {
      return "warning";
    }
    else if(atype == "Info") {
      return "primary";
    }
  }

  render() {
    return(
      <Container fluid className="page-container">
        <Container fluid className="siteHeader d-flex align-items-end">
          <h1 className="siteHeaderTitle px-3 mb-3">Alerts</h1>
        </Container>
        <Container className="px-4">
          <Accordion flush>
            <Accordion.Item>
              <Accordion.Header>
                <h2>Upcoming</h2>
              </Accordion.Header>
              <Accordion.Body>
                {this.state.alertList.map( (lister) => {
                    return(
                      <Card
                        className="mb-3"
                        bg={this.getBackground(lister.alert_type)}
                        text={this.getBackground(lister.alert_type) === 'light' ? 'dark' : 'white'}
                      >
                      <Card.Body >
                      {this.textString(lister)}
                      </Card.Body>
                      </Card>)
                })}
                {/* <Card className="mb-3">
                  <Card.Body>This is some text within a card body.</Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Body>This is some text within a card body.</Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Body>This is some text within a card body.</Card.Body>
                </Card>
                <Card className="mb-3">
                  <Card.Body>This is some text within a card body.</Card.Body>
                </Card> */}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <h2>Calendar</h2>
        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>

    );
  }
}

export default withRouter(AlertsAndCalendar);
