import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import login from './pages/login';
import loginContainer from './containers/login/loginContainer';
import sigunpContainer from './containers/signup/signupContainer';
import homeContainer from './containers/home/homeContainer';
import { errorPage } from './shared/utillity';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route path='/' component={homeContainer} /> */}
          <Route exact path='/login' component={loginContainer} />
          <Route exact path='/signup' component={sigunpContainer} />
          <Route to='/' component={homeContainer} />
          <Route component={errorPage} />
        </Switch>
      </Router>
    );
  }
}
export default App;
