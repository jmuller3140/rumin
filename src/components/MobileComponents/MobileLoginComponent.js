import React from 'react';
import {Link} from 'react-router-dom';

import './MobileLoginComponent.css';

 export default class MobileLoginComponent extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.props.handleSubmit;
    this.onChange = this.props.onChange;

  }

   render(){
     return (
      <div className='login-container'>
                 <form id='mobile-loginForm' onSubmit={this.handleSubmit}>
                    <ul>
                       <li><label>LOGIN</label></li>
                       <li><input className="textbox-login" name='email' placeholder='Email' onChange={e => this.onChange(e)} value={this.props.email}/></li>
                       <li><input className="textbox-login" name='password' type='password' placeholder='Password' onChange={e => this.onChange(e)} value={this.props.password}/></li>
                       <li><input className='submit' id="mobile-submitLogin" type='submit' value='Submit' /></li>
                       <li><p id="login-or">or </p></li>
                       <li><Link  className='link' id="mobile-registrationLink"to='Register'>Registration</Link></li>
                   </ul>
                  </form>
      </div>
      );
   }
 }
