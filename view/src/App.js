import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// import login from './pages/login';
import loginContainer from './containers/login/loginContainer';
import sigunpContainer from './containers/signup/signupContainer';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/login' component={loginContainer} />
            <Route exact path='/signup' component={sigunpContainer} />
            <Redirect to='/' />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
