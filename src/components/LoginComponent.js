import React from 'react';
import PropTypes from 'prop-types';

import './LoginComponent.css';

 const LoginComponent = (props) => {

  const { handleSubmit, onChange, email, password } = props;

     return (
      <div className='login-container'>
        <div className='login-content-wrapper'>
          <div className='login-form-container'>
                 <form className='loginForm' onSubmit={handleSubmit}>
                    <ul>
                       <li><label>LOGIN</label></li>
                        <li><input name='email' placeholder='Email' onChange={e => onChange(e)} value={email}/></li>
                       <li><input name='password' type='password' placeholder='Password' onChange={e => onChange(e)} value={password}/></li>
                        <li><input className='submit' type='submit' value='Submit' /></li>
                   </ul>
                  </form>
            </div>
        </div>
      </div>
      );
 }

LoginComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onChange: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string
}

export default LoginComponent;
