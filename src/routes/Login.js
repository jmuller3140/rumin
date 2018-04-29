import React from 'react';
import jwtDecode from 'jwt-decode';

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

	  handleSubmit = (e) =>{
	       const { email, password } = this.state;
	    e.preventDefault();
	    fetch('http://localhost:3001/login', {
	     method: 'post',
	     headers: {'Content-Type':'application/json',
	                'Accept': 'application/json'},
	     body: {
	      email: email,
	      password: password
	     }
	    })
	    .then(res => res.json())
	    .then(data => {
	      console.log(data);
	      const { token, refreshToken } = data[0];
	      const decodedToken = jwtDecode(token);
	      console.log(decodedToken);
	      const { firstName, lastName } = decodedToken;
	       localStorage.setItem('token', token);
	       localStorage.setItem('refreshToken', refreshToken);
	       localStorage.setItem('firstName', firstName);
	       localStorage.setItem('lastName', lastName);

	       window.location.reload();
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
