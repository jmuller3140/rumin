import React from 'react';
import PropTypes from 'prop-types';

import './RegisterComponent.css';

 const RegisterComponent = (props) => {

  const {handleSubmit, onChange, email, firstName, lastName, password, passwordConfirm } = props;

     return (
      <div className='register-container'>
        <div className='register-content-wrapper'>
          <div className='register-form-container'>
                 <form className='registerForm' onSubmit={handleSubmit}>
                    <ul>
                       <li><label>REGISTER</label></li>
                        <li><input name='email' placeholder='Email' onChange={e => onChange(e)} value={email}/></li>
                       <li><input name='password' type='password' placeholder='Password' onChange={e => onChange(e)} value={password}/></li>
                       <li><input name='passwordConfirm' type='password' placeholder='Confirm password' onChange={e => onChange(e)} value={passwordConfirm}/></li>
                       <li><input name='firstName' placeholder='First Name' onChange={e => onChange(e)} value={firstName}/></li>
                        <li><input name='lastName' placeholder='Last Name' onChange={e => onChange(e)} value={lastName}/></li>
                        <li><input type='submit' value='Submit' /></li>
                   </ul>
                  </form>
            </div>
        </div>
      </div>
      );
 }

RegisterComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onChange: PropTypes.func
}

export default RegisterComponent
