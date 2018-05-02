import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Entry from './Entry';
import Register from './Register';

import './index.css';

const authenticate = () => {
  const token = localStorage.getItem('token');
  if (!token ) {
    return false;
  }
  //   try {
  //   // { exp: 12903819203 }
  //   // const { exp } = decode(refreshToken);

  //   // if (exp < new Date().getTime() / 1000) {
  //   //   return false;
  //   // }

  // } catch (e) {
  //   return false;
  // }
  return true;
};


const buildRoutes = () => {
	const isAuth = authenticate();
		if(isAuth)
		{
			  return (
                  <Switch>
                    <Route exact path="/" props={{pageName: Home}} component={Home} />
                    <Route exact path="/entry" props={{pageName: Entry}} component={Entry} />
                  </Switch>
				);
		}	
		else
    {
			  return (
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
      );
  }
};


const AuthRoutes = () => (
  <Router>
    <div>
    {buildRoutes()}
    </div>
  </Router>
);

export default AuthRoutes;
