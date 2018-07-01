import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';


export default class HeaderHome extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstName: localStorage.getItem('firstName'),
			lastName: localStorage.getItem('lastName'),
			pageName: this.props.pageName
		}
	}
	render(){
		console.log(this.props.logout);
		return (
			<header>
				<div className="navbar-container">
							<div className='nav-first-item'>
								<p>{this.state.firstName} {this.state.lastName}</p>
								<Link className='link' to='/' onClick={this.props.logout}>Logout</Link>
							</div>
							<div className='nav-second-item'>
								<p>{this.state.pageName}</p>
							</div>
							<div className="nav-third-item">
							</div>
							<div className='nav-fourth-item'>
								<Link className='link' to='/'><p>Home</p></Link>
								<Link  className='link' to='Entry'><p>Entry</p></Link>
							</div>
				</div>
			</header>		
		);
	}
}