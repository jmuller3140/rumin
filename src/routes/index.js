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
    return "logout";
  }
    try {
      const {exp} = jwt.decode(token);

     if(exp < new Date().getTime() / 1000) {
       return "expire";
    }
  } catch (e) {
    return "error";
  }

  return "authenticated";
};
///////////////////////////////////////////////////////////
/* authRoutes returns the routes dynamically generated */
///////////////////////////////////////////////////////////
const homeComponent = () => {
  let props = {pageName: 'Home', authenticate: authenticate};
  return (<Home {...props} />)
}

const entryComponent = () => {
  let props = {pageName: 'Entry', authenticate: authenticate};
  return (<Entry {...props} />)
}

const loginComponent = () => {
  let props = {pageName: 'Login'};
  return (<Login {...props} />)
}

const registerComponent = () => {
  let props = {pageName: 'Register'};
  return (<Register {...props} />)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/* build routes that will get rendered conditionally based on if the user is authenticated or not */
/////////////////////////////////////////////////////////////////////////////////////////////////////
const buildRoutes = () => {
	const isAuth = authenticate();
		if(isAuth === "authenticated")
		{
			  return (
              <Switch>
                <Route exact path="/" render={homeComponent} />
                <Route path="/entry" render={entryComponent} />
              </Switch>
				);
		}	
		else
    {
			  return (
              <Switch>
                <Route exact path="/" render={loginComponent} />
                <Redirect from="/entry" to="/" />
                <Route exact path="/register" render={registerComponent} />
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
