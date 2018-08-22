import React from 'react';
import { Link} from 'react-router-dom';

import './MobileRegisterComponent.css';

 export default class MobileRegisterComponent extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.props.handleSubmit;
    this.onChange = this.props.onChange;

  }

   render(){
     return (
      <div className='register-container'>
                 <form id='mobile-registerForm' onSubmit={this.handleSubmit}>
                    <ul>
                       <li><label>REGISTER</label></li>
                       <li><input name='email' className="textbox-register" placeholder='Email' onChange={e => this.onChange(e)} value={this.props.email}/></li>
                       <li><input name='password' className="textbox-register" type='password' placeholder='Password' onChange={e => this.onChange(e)} value={this.props.password}/></li>
                       <li><input name='passwordConfirm' className="textbox-register" type='password' placeholder='Confirm password' onChange={e => this.onChange(e)} value={this.props.passwordConfirm}/></li>
                       <li><input name='firstName' className="textbox-register" placeholder='First Name' onChange={e => this.onChange(e)} value={this.props.firstName}/></li>
                       <li><input name='lastName' className="textbox-register" placeholder='Last Name' onChange={e => this.onChange(e)} value={this.props.lastName}/></li>
                       <li><input type='submit' id="mobile-submitRegister" value='Submit' /></li>
                       <li><p id="register-or">or</p></li>
                       <li><Link  className='link' id="mobile-loginLink"to='/'>Login</Link></li>
                   </ul>
                  </form>
      </div>
      );
   }
 }
