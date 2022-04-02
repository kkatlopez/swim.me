import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MeetResults from './MeetResults.js';
import Roster from './Roster.js';
import SpecificMeet from './SpecificMeet.js'
import AllTimeTop10 from './AllTimeTop10.js';
import Event from './Event.js';
import Time from './Times.js';
import RosterProfile from './RosterProfile.js'
import UserLanding from './UserLogin.js';
import Admin from './Admin.js';
import AdminCreateAlert from './AdminCreateAlert';
import AdminModifyUser from './AdminModifyUser.js';
import AdminEditSwimmer from './AdminEditSwimmer.js';
import AdminEditForm from './AdminEditForm.js';

// localhost:3000

const Main = (props) => {
  //console.log(props);
  return (
    <Switch>
      <Route exact path='/' render={
        () => <div><UserLanding/></div>
      }></Route>
      <Route exact path='/results' render={
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
      <Route exact path='/roster/profile' render={
        () => <div><RosterProfile/></div>
      }></Route>
      <Route exact path='/admin' render={
        () => <div><Admin/></div>
      }></Route>
      <Route exact path='/admin/create-alert' render={
        () => <div><AdminCreateAlert/></div>
      }></Route>
      <Route exact path='/admin/edit-swimmer' render={
        () => <div><AdminEditSwimmer/></div>
      }></Route>
      <Route exact path='/admin/edit-swimmer-form' render={
        () => <div><AdminEditForm/></div>
      }></Route>
      <Route exact path='/admin/modify-user' render={
        () => <div><AdminModifyUser/></div>
      }></Route>
      <Redirect from='*' to='/' />
    </Switch>

  );
}

export default Main;
