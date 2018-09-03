import React from 'react';
import jwtDecode from 'jwt-decode';
import request from 'superagent';
import qs from 'qs';
import { ToastContainer, toast } from 'react-toastify';
import MediaQuery from 'react-responsive';

import LoginComponent from '../components/LoginComponent';
import Header from '../components/Header';
import MobileHeaderHome from '../components/MobileComponents/MobileHeaderComponents/MobileHeaderHome';
import MobileLoginComponent from '../components/MobileComponents/MobileLoginComponent';

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
 		this.getUrlParams = this.getUrlParams;
 	}

 	getUrlParams = () => {
 		let url = window.location.search;
		url = url.replace("?", '');
		return url;
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
		    .post(process.env.REACT_APP_URL_LOGIN)
		    .set('Content-Type','application/json')
		    .set('Accept', 'application/json')
		    .send( data )
		    .end((err, res) => {
		    if(err){
		    		console.log(process.env.REACT_APP_URL_LOGIN);
		    		console.log(err);
		    } else {
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
   	const params = qs.parse(qs.parse(this.getUrlParams()));
   	if(params.msg === "success"){
   		this.addNotification("Your registration was successful", toast.TYPE.SUCCESS);
   	}else if(params.msg === "expire"){
   		this.addNotification("Your session expired. Please login again.", toast.TYPE.INFO);
   	}
}


   render(){
   		const propsHeader = {title: 'RUMIN', pageName: 'Login', showSettings: false};
     return (
     	<div style={{height:'100%'}}>
		<MediaQuery minWidth={896}>
	          <Header pageName="Login" />
	          <LoginComponent onChange={this.onChange} handleSubmit={this.handleSubmit} password={this.state.password} email={this.state.email} />
	          <ToastContainer toastClassName="toast"  />
		</MediaQuery>
		<MediaQuery maxWidth={895}>
			  <MobileHeaderHome {...propsHeader}/>
	          <MobileLoginComponent onChange={this.onChange} handleSubmit={this.handleSubmit} password={this.state.password} email={this.state.email} />
	          <ToastContainer toastClassName="toast"  />
		</MediaQuery>
		</div>
        )

   }
 }
