import React from 'react';
import {Redirect} from 'react-router-dom';

import './RegisterComponent.css';

 export default class RegisterComponent extends React.Component{
   constructor(props){
    super(props);
    this.handleSubmit = this.props.handleSubmit;
    this.onChange = this.props.onChange;
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
  }


   render(){

     return (
      <form onSubmit={this.props.handleSubmit}>
        <label>REGISTER</label>
        <input name='email' placeholder='Email' onChange={e => this.onChange(e)} value={this.state.email}/>
        <input name='password' type='password' placeholder='Password' onChange={e => this.onChange(e)} value={this.state.password}/>
        <input type='submit' value='Submit' />
      </form>
      );
   }
 }
