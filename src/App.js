import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import MyNavbar from './components/layout/MyNavbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import Login from './components/auth/Login';

import history from './history';

const config = {
  baseUrl: 'https://dev-375318.oktapreview.com',
  issuer: '/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oafkmls8pfKpdYQm0h7'
};

class App extends Component {

  onAuthRequired() {
    console.log('>>> on Auth required');
    history.push('/login');
  }

  render() {
    return (
      <Router>
        <Security
          issuer={`${config.baseUrl}${config.issuer}`}
          client_id={config.client_id}
          redirect_uri={config.redirect_uri}
          onAuthRequired={this.onAuthRequired}
        >
          <div className="App">
            <MyNavbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/staff" exact={true} component={Staff} />
              <Route
                path="/login"
                render={() => (
                  <Login baseUrl="https://dev-409495.oktapreview.com" />
                )}
              />
              <Route path="/implicit/callback" component={ImplicitCallback} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
