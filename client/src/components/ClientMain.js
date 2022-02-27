import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FrontPage from './FrontPage.js';

// localhost:3000

const Main = (props) => {
  //console.log(props);
  return (
    <Switch>
      <Route exact path='/' render={
        () => <div><FrontPage/></div>
      }></Route>
      {}
    </Switch>
  );
}

export default Main;