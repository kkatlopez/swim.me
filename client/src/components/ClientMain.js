import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MeetResults from './MeetResults.js';
import Roster from './Roster.js';
import SpecificMeet from './SpecificMeet.js'
import AllTimeTop10 from './AllTimeTop10.js';
import Event from './Event.js';
import TimesSearch from './TimesSearch.js';
import RosterProfile from './RosterProfile.js'
import Times from './Times.js';
import UserLanding from './UserLogin.js';

// localhost:3000

const Main = (props) => {
  //console.log(props);
  return (
    <Switch>
      <Route exact path='/results' render={
        () => <div><MeetResults/></div>
      }></Route>
      <Route exact path='/login' render={
        () => <div><UserLanding/></div>
      }></Route>
      <Route exact path="/meet/:meetName" component={SpecificMeet} />
      <Route exact path="/meet/:meetName/event/:eventName" component={Event} />
      <Route exact path='/alltimetop10' render={
        () => <div><AllTimeTop10/></div>
      }></Route>
      <Route exact path='/times' render={
        () => <div><TimesSearch/></div>
      }></Route>
      <Route exact path="/times/:swimmerName" component={Times} />
      <Route exact path='/roster' render={
        () => <div><Roster/></div>
      }></Route>
      <Route exact path='/roster/:firstName/:lastName' render={
        () => <div><RosterProfile/></div>
      }></Route>
      <Route exact path='/' render={
        () => <div><UserLanding/></div>
      }></Route>
      <Redirect from='*' to='/' />
    </Switch>

  );
}

export default Main;
