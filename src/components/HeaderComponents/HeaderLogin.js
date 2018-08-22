import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './Header.css';


const HeaderLogin = (props) => {
	const { pageName } = props;
		return (
			<header>
				<div className="navbar-container">
							<div className='nav-first-item'>
							</div>
							<div className='nav-second-item'>
								<p>{pageName}</p>
							</div>
							<div className="nav-third-item">
							</div>
							<div className='nav-fourth-item'>
								<Link className='link' to='/'><p>Login</p></Link>
								<Link  className='link' to='Register'><p>Registration</p></Link>
							</div>
				</div>
			</header>
			);
}

HeaderLogin.propTypes = {
	pageName: PropTypes.string
}

export default HeaderLogin;


