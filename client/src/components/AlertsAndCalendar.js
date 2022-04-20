import React, { Component } from 'react';
import { Container, Accordion, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import '../css/alerts.css';
import Navigation from "./Navigation.js";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

class AlertsAndCalendar extends Component {

  constructor(props) {
    super(props);
    // redirect to login if not logged in
    if (this.props.location.state === undefined) {
      this.props.history.push("/", { logged: false });
    }
    else if (!('logged' in this.props.location.state)) {
      this.props.history.push("/", { logged: false });
    }
    else if(this.props.location.state.logged === false) {
      this.props.history.push("/", { logged: false });
    }

    this.state = {
      alertList: [],
      logged: this.props.location.state.logged,
      admin: this.props.location.state.admin,
      user: this.props.location.state.user
    }

    // updates the content of the form whenever there is a change:
    this.getBackground = this.getBackground.bind(this);
    this.textString = this.textString.bind(this);
  }

  // getting alerts from the database and sorting according to date THEN alert type (high, medium, low, info)
  populateAlerts() {
    fetch("http://localhost:3001/alert_info")
      .then(res => res.json())
      .then(
        (result) => {
          result.sort(function(x, y) {
            if (x.alert_end_date < y.alert_end_date) {
              return -1;
            }
            if (x.alert_end_date > y.alert_end_date) {
              return 1;
            }
            if (x.alert_type === "High") {
              return -1;
            }
            if (y.alert_type === "High") {
              return 1;
            }
            if (x.alert_type === "Medium") {
              return -1;
            }
            if (y.alert_type === "Medium") {
              return 1;
            }
            if (x.alert_type === "Low") {
              return -1;
            }
            if (y.alert_type === "Low") {
              return 1;
            }
            if (x.alert_type === "Info") {
              return -1;
            }
            if (y.alert_type === "Info") {
              return 1;
            }
            return 0;
          });

          const today = new Date().toISOString().split('T')[0];
          result = result.filter(item => item.alert_end_date.split('T')[0] >= today);
          this.setState({
            alertList: result.slice(0, 3)
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
    this.populateAlerts();
  }

  // converting dates for alerts ONLY if the alert is high, medium, or low (info does not show date)
  textString = function(lister) {
    var atype = lister.alert_type;
    var date = lister.alert_end_date;
    var text = lister.alert_text;
    var return_str = "";
    if (atype !== "Info") {
      return_str += date.substring(5,7) + "/" + date.substring(8,10) + " - ";
    }
    return_str += text;
    return return_str
  }

  // returns the background color of the alert depending on the type
  getBackground = function(atype) {
    if(atype === "High") {
      return "danger";
    }
    else if(atype === "Medium") {
      return "warning";
    }
    else if(atype === "Low") {
      return "secondary";
    }
    else if(atype === "Info") {
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

          <Accordion flush defaultActiveKey='1' alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h2 className="sectionTitle">Upcoming</h2>
              </Accordion.Header>
              <Accordion.Body>
                {this.state.alertList.map( (lister) => {
                  return(
                    <Alert
                      className="mb-3"
                      variant={this.getBackground(lister.alert_type)}
                      text={this.getBackground(lister.alert_type) === 'light' ? 'dark' : 'white'}
                    >
                    {this.textString(lister)}
                    </Alert>)
                })}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h2 className="sectionTitle">Calendar</h2>
              </Accordion.Header>
              <Accordion.Body className="cal">
              <FullCalendar
                  plugins={[ dayGridPlugin, googleCalendarPlugin, timeGridPlugin, listPlugin ]}
                  initialView="dayGridMonth"
                  events= {{
                    googleCalendarId: 'swimmeapp@gmail.com'
                  }}
                  googleCalendarApiKey="AIzaSyDG-ydNYpHAxJnhlZ8W7aREzdjxpE_-ycM"
                  headerToolbar={{
                    right: 'prev,next today',
                    left: 'title',
                    center: 'dayGridMonth,timeGridWeek,listWeek'
                  }}
                  
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
        <Navigation logged = {this.props.location.state.logged} admin = {this.props.location.state.admin} user = {this.props.location.state.user}/>
      </Container>

    );
  }
}

export default withRouter(AlertsAndCalendar);