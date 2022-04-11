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
import Admin from './Admin.js';
import AdminCreateAlert from './AdminCreateAlert';
import AdminModifyUser from './AdminModifyUser.js';
import AdminCreateUser from './AdminCreateUser.js';
import AdminEditForm from './AdminEditForm.js';
import Messaging from './Messaging.js';
import SpecificChat from './SpecificChat.js';

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
        () => <div><AdminEditForm/></div>
      }></Route>
      <Route exact path='/admin/modify-user' render={
        () => <div><AdminModifyUser/></div>
      }></Route>
       <Route exact path='/admin/create-user' render={
        () => <div><AdminCreateUser/></div>
      }></Route>
      <Route exact path='/chat' render={
        () => <div><Messaging/></div>
      }></Route>
      <Route exact path="/chat/:chatID" component={SpecificChat} />
      <Route exact path='/' render={
        () => <div><UserLanding/></div>
      }></Route>
      <Redirect from='*' to='/' />
    </Switch>

  );
}

export default Main;
