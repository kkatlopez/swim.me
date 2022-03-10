import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MeetResults from './MeetResults.js';
import RosterPage from './Roster.js';
import SpecificMeet from './SpecificMeet.js'
import AllTimeTop10 from './AllTimeTop10.js';

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
    </Switch>
    
  );
}

export default Main;