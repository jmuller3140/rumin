import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';


export default class HeaderLogin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageName: this.props.pageName
		}
	}
	render(){
		return (
			<header>
				<div className="navbar-container">
							<ul className='title'>
								<li>{this.state.pageName}</li>
							</ul>
							<ul className='navigation'>
								<li><Link className='link' to='/'>Login</Link></li>
								<li><Link  className='link' to='Register'>Registration</Link></li> 
							</ul>
				</div>
			</header>
			);
	}
}