import React from 'react';
import {Redirect} from 'react-router-dom';

import RegisterComponent from '../components/RegisterComponent';
import Header from '../components/Header';

 export default class Register extends React.Component{
 	constructor(){
 		super();
 		this.state = {};
 		this.onChange = this.onChange;
 		this.handleSubmit = this.handleSubmit;
 	}


 	  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) =>{

    const { email, password } = this.state;
    console.log(this.state);
    e.preventDefault();
    fetch('http://localhost:3001/register', {
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

     }

       );
  }

   render(){
     return (
      <div>
        <Header pageName="Register"/>
        <RegisterComponent handleSubmit={this.handleSubmit} onChange={this.onChange}/>
      </div>
      )
   }
 }
