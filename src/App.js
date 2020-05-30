import React from 'react';

import Login from './components/login/login';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './midRouter';
import ItemTabs from './components/tabs/tabs';
import Extra from './components/extra/extra';
import { ViewSeats } from './components/seatselect/selectseat';
// import Dummy from './dummy';


function App() {
  return (
    <div>
      {/* <Extra /> */}
      {/* <ViewSeats /> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/LoginPage" component={Login} />
          <Route exact path="/loginSuccessful" component={ItemTabs} />
        </Switch>
      </Router>
      {/* <Dummy /> */}

    </div>
  );
}

export default App;
