import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MeetResults from './MeetResults.js';
import Roster from './Roster.js';
import SpecificMeet from './SpecificMeet.js'
import AllTimeTop10 from './AllTimeTop10.js';
import Event from './Event.js';
import Time from './Times.js';

// localhost:3000

const Main = (props) => {
  //console.log(props);
  return (
    <Switch>
      <Route exact path='/' render={
        () => <div><MeetResults/></div>
      }></Route>
      <Route exact path='/meet' render={
        () => <div><SpecificMeet/></div>
      }></Route>
      {/* {} */}
      <Route exact path='/alltimetop10' render={
        () => <div><AllTimeTop10/></div>
      }></Route>
      <Route exact path='/event' render={
        () => <div><Event/></div>
      }></Route>
      <Route exact path='/times' render={
        () => <div><Time/></div>
      }></Route>
      <Route exact path='/roster' render={
        () => <div><Roster/></div>
      }></Route>
    </Switch>
    
  );
}

export default Main;