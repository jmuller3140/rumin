import React from 'react';

import './LoginComponent.css';

 export default class LoginComponent extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.props.handleSubmit;
    this.onChange = this.props.onChange;

  }

   render(){
     return (
      <div className='login-container'>
        <div className='login-content-wrapper'>
          <div className='login-form-container'>
                 <form className='loginForm' onSubmit={this.handleSubmit}>
                    <ul>
                       <li><label>LOGIN</label></li>
                        <li><input name='email' placeholder='Email' onChange={e => this.onChange(e)} value={this.props.email}/></li>
                       <li><input name='password' type='password' placeholder='Password' onChange={e => this.onChange(e)} value={this.props.password}/></li>
                        <li><input className='submit' type='submit' value='Submit' /></li>
                   </ul>
                  </form>
            </div>
        </div>
      </div>
      );
   }
 }


  // <p id="quote">"Writing is like a 'lust,' or like 'scratching an itch.' Writing comes as a result of a very strong impulse, and when it does come, I, for one, must get it out.</p>
