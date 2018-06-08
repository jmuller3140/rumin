import React from 'react';
import {Redirect} from 'react-router-dom';

import './RegisterComponent.css';

 export default class RegisterComponent extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.props.handleSubmit;
    this.onChange = this.props.onChange;

  }

   render(){
     return (
      <div className='register-container'>
        <div className='register-content-wrapper'>
          <div className='register-form-container'>
                 <form className='registerForm' onSubmit={this.handleSubmit}>
                    <ul>
                       <li><label>REGISTER</label></li>
                        <li><input name='email' placeholder='Email' onChange={e => this.onChange(e)} value={this.props.email}/></li>
                       <li><input name='password' type='password' placeholder='Password' onChange={e => this.onChange(e)} value={this.props.password}/></li>
                       <li><input name='passwordConfirm' type='password' placeholder='Confirm password' onChange={e => this.onChange(e)} value={this.props.passwordConfirm}/></li>
                       <li><input name='firstName' placeholder='First Name' onChange={e => this.onChange(e)} value={this.props.firstName}/></li>
                        <li><input name='lastName' placeholder='Last Name' onChange={e => this.onChange(e)} value={this.props.lastName}/></li>
                        <li><input type='submit' value='Submit' /></li>
                   </ul>
                  </form>
            </div>
        </div>
      </div>
      );
   }
 }
