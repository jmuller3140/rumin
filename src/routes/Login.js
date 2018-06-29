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
 		this.checkEmail = this.checkEmail;
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

/////////////////////////////////////
/* check for correct email format */
/////////////////////////////////////
  checkEmail = (str) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  }
////////////////////////////////////
/* loginHandler to log someone in */
////////////////////////////////////
	  handleSubmit = (e) => {
	    const { email, password } = this.state;
	    const data = { email: email, password: password };
	    e.preventDefault();
        let emailConfirmation = this.checkEmail(email);

        if(emailConfirmation){

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
      }else {
        this.addNotification("Incorrect email format. Please Re-enter your email.", toast.TYPE.ERROR);
      }

}
////////////////////////////////////
/* loginHandler to log someone in */
////////////////////////////////////
	componentDidMount(){
   	console.log(window.location.search);
   	const params = queryString.parse(window.location.search);
   	if(params.msg === "success"){
   		this.addNotification("Your registration wass successful", toast.TYPE.SUCCESS);
   	}else if(params.msg === "expire"){
   		this.addNotification("Your session expired. Please login again.", toast.TYPE.INFO);
   	}
}


   render(){
     return (
        <div>
          <Header pageName="Login" />
          <LoginComponent onChange={this.onChange} handleSubmit={this.handleSubmit} password={this.state.password} email={this.state.email} />
          <ToastContainer toastClassName="toast"  />
        </div>
        )    	
      
   }
 }
