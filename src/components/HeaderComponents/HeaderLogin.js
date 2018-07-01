import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';


export default class HeaderLogin extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<header>
				<div className="navbar-container">
							<div className='nav-first-item'>
							</div>
							<div className='nav-second-item'>
								<p>{this.props.pageName}</p>
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
}