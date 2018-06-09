import React from 'react';
import jwtDecode from 'jwt-decode';
import request from 'superagent';
import queryString from 'query-string';
import { ToastContainer, toast } from 'react-toastify';

import LoginComponent from '../components/LoginComponent';
import Header from '../components/Header';

import 'react-toastify/dist/ReactToastify.css';
import './Login.css'

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
///////////////////////////////////////////
/* onChange event handler to change text */
///////////////////////////////////////////
	  onChange = (e) => {
	    this.setState({
	      [e.target.name]: e.target.value
	    })
	  }
///////////////////////////////////////////
/* adds a notification */
///////////////////////////////////////////
	  addNotification = (msg, type) => toast(msg, {
	  type: type,
      position: toast.POSITION.BOTTOM_RIGHT,
      hideProgressBar: true
  });

////////////////////////////////////
/* loginHandler to log someone in */
////////////////////////////////////
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
   	console.log(window.location.search);
   	const params = queryString.parse(window.location.search);
   	if(params.msg === "success"){
   		this.addNotification("Your registration wass successful", toast.TYPE.SUCCESS);
   	}
     return (
        <div>
          <Header pageName="Login" />
          <LoginComponent onChange={this.onChange} handleSubmit={this.handleSubmit} password={this.state.password} email={this.state.email} />
          <ToastContainer toastClassName="toast"  />
        </div>
        )    	
      
   }
 }
