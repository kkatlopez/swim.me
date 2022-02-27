import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MeetResults from './MeetResults.js';
import RosterPage from './Roster.js';


// localhost:3000

const Main = (props) => {
  //console.log(props);
  return (
    <Switch>
      <Route exact path='/' render={
        () => <div><MeetResults/></div>
      }></Route>
      <Route exact path='/roster' render={
        () => <div><RosterPage/></div>
      }></Route>
      {}
    </Switch>
  );
}

export default Main;