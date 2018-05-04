import React from 'react';
import {Redirect} from 'react-router-dom';
import request from 'superagent';

import RegisterComponent from '../components/RegisterComponent';
import Header from '../components/Header';

 export default class Register extends React.Component{
  constructor(){
    super();
    this.state = {
          email: '',
          password: '',
          firstName: '',
          lastName: ''
      };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
/////////////////////////////////////
/* onChange to change input values */
/////////////////////////////////////
    onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
////////////////////////////////////
/* event handler for registration */
////////////////////////////////////
    handleSubmit = (e) =>{
         const { email, password, firstName, lastName } = this.state;
         const data = {email: email, password: password, firstName: firstName, lastName: lastName};
      e.preventDefault();

      let that=this;
      request
    .post('http://localhost:3001/register')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send( data )
    .end(function(err, res){
      that.setState({email: ''});
      that.setState({password: ''});
      that.setState({firstName: ''});
      that.setState({lastName: ''});
      console.log(res);
    });  
}

   render(){
    const props = {handleSubmit: this.handleSubmit, onChange: this.onChange, email: this.state.email, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName};
     return (
      <div>
        <Header pageName="Register"/>
        <RegisterComponent {...props}/>
      </div>
      )
   }
 }
