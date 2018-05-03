import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import Login from './Login';
import Home from './Home';
import Entry from './Entry';
import Register from './Register';

import './index.css';

//////////////////////////////
/*Authentication function*/
//////////////////////////////
const authenticate = () => {
  const token = localStorage.getItem('token');
  if (!token ) {
    return false;
  }
    try {
      const {exp} = jwt.decode(token);

     if(exp < new Date().getTime() / 1000) {
       return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////
/* build routes that will get rendered conditionally based on if the user is authenticated or not */
/////////////////////////////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////
/* authRoutes returns the routes dynamically generated */
///////////////////////////////////////////////////////////
const AuthRoutes = () => (
  <Router>
    <div>
    {buildRoutes()}
    </div>
  </Router>
);

export default AuthRoutes;
