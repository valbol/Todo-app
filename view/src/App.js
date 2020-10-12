import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import login from './pages/login';
import loginContainer from './containers/login/loginContainer';
import sigunpContainer from './containers/signup/signupContainer';
import homeContainer from './containers/home/homeContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/login' component={loginContainer} />
            <Route exact path='/signup' component={sigunpContainer} />
            <Route exact to='/' component={homeContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
