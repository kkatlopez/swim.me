import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FrontPage from './FrontPage.js';

const Main = (props) => {
  //console.log(props);
  return (
    <Switch>
      <Route exact path='/' render={
        () => <div><ClientTopBar page="front" /><FrontPage/></div>
      }></Route>
      {}
    </Switch>
  );
}

export default Main;