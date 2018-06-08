import React from 'react';
import {Redirect} from 'react-router-dom';
import request from 'superagent';
import { ToastContainer, toast } from 'react-toastify';

import RegisterComponent from '../components/RegisterComponent';
import Header from '../components/Header';

 export default class Register extends React.Component{
  constructor(){
    super();
    this.state = {
          email: '',
          password: '',
          passwordConfirm: '',
          firstName: '',
          lastName: '',
          redirect: false
      };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.addNotification = this.addNotification.bind(this);
  }
/////////////////////////////////////
/* onChange to change input values */
/////////////////////////////////////
    onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
/////////////////////////////////////
/* onChange to change input values */
/////////////////////////////////////
    addNotification = (msg) => toast(msg, {
    type: toast.TYPE.ERROR,
      position: toast.POSITION.BOTTOM_RIGHT,
      hideProgressBar: true,
      autoClose: 6000
  });
/////////////////////////////////////
/* check for correct password format */
/////////////////////////////////////
  checkPassword = (str) => {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(str);
  }
/////////////////////////////////////
/* check for correct email format */
/////////////////////////////////////
  checkEmail = (str) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  }
////////////////////////////////////
/* event handler for registration */
////////////////////////////////////
    handleSubmit = (e) =>{
     e.preventDefault();
      const { email, password, passwordConfirm, firstName, lastName } = this.state;
      let emailConfirmation = this.checkEmail(email);
      let passwordConfirmation = this.checkPassword(password);

      if(password == passwordConfirm && passwordConfirmation && emailConfirmation){
          const data = {email: email, password: password, firstName: firstName, lastName: lastName};

          let that=this;
          request
        .post('http://localhost:3001/register')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send( data )
        .end(function(err, res){
          if(res.status == 201){
          that.setState({redirect: true});
        }
          console.log(res);
        }); 

      }else if(!emailConfirmation){
        this.addNotification("Email incorrectly formatted. Re-enter your email.");
      }else if(password != passwordConfirm){
        this.setState({password: ''});
        this.setState({passwordConfirm: ''});
        this.addNotification("Password did not match it's confirmation.");
      }else if(!passwordConfirmation){
        this.addNotification("Password must have at least one number, one lowercase and one uppercase letter, at least six characters that are letters, numbers or the underscore.");
      }
 
}

   render(){
    const props = {handleSubmit: this.handleSubmit, onChange: this.onChange, email: this.state.email, password: this.state.password, passwordConfirm: this.state.passwordConfirm, 
      firstName: this.state.firstName, lastName: this.state.lastName};
     return (
      <div>
        {this.state.redirect && <Redirect to='/?msg=success' />}
        <Header pageName="Register"/>
        <RegisterComponent {...props}/>
        <ToastContainer toastClassName="toast"  />
      </div>
      )
   }
 }
