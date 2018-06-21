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
		return (
			<header>
				<div className="navbar-container">
							<ul className='userName'>
								<li>{this.state.firstName} {this.state.lastName}</li>
							</ul>
							<ul className='logout'>
								<li><Link className='link' to='/' onClick={this.props.logout}>Logout</Link></li>
							</ul>
							<ul className='title'>
								<li>{this.state.pageName}</li>
							</ul>
							<ul className='toolbar'>
							</ul>
							<ul className='navigation'>
								<li><Link className='link' to='/'>Home</Link></li>
								<li><Link  className='link' to='Entry'>Entry</Link></li> 
							</ul>
				</div>
			</header>		
		);
	}
}