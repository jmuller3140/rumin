import React from 'react';
import jwtDecode from 'jwt-decode';
import request from 'superagent';

import LoginComponent from '../components/LoginComponent';
import Header from '../components/Header';

 export default class Login extends React.Component{
 	constructor(){
 		super();
 		this.state = {
      		email: '',
      		password: ''
    	};
 		this.onChange = this.onChange;
 		this.handleSubmit = this.handleSubmit;
 	}

	  onChange = (e) => {
	    this.setState({
	      [e.target.name]: e.target.value
	    })
	  }

	  handleSubmit = (e) => {
	       const { email, password } = this.state;
	       const data = { email: email, password: password };
	    e.preventDefault();
	    request
	    .post('http://localhost:3001/login')
	    .set('Content-Type','application/json')
	    .set('Accept', 'application/json')
	    .send( data )
	    .end((err, res) => {
	    if(err){
	    		console.log(err);
	    } else {
	      console.log(res.status);
	      const { token } = res.body;
	      const decodedToken = jwtDecode(token);
	      console.log(decodedToken);
	      const { firstName, lastName } = decodedToken;
	       localStorage.setItem('token', token);
	       localStorage.setItem('firstName', firstName);
	       localStorage.setItem('lastName', lastName);

	       window.location.reload();
	    }
	    });

}

  
   render(){
     return (
        <div>
          <Header pageName="Login" />
          <LoginComponent onChange={this.onChange} handleSubmit={this.handleSubmit} password={this.state.password} email={this.state.email} />
        </div>
        )
   }
 }
