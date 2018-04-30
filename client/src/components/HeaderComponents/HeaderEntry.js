import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faSave, faArrowUp} from '@fortawesome/fontawesome-free-solid/';


import './Header.css';


export default class HeaderEntry extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstName: localStorage.getItem('firstName'),
			lastName: localStorage.getItem('lastName'),
		}
	}
	render(){
		console.log(this.props.options);
		return (
			<header>
				<div className="navbar-container">
					<div className="navbar-content-wrapper">
						<div className="navbar-content">
							<ul className='userName'>
								<li>{this.state.firstName} {this.state.lastName}</li>
							</ul>
							<ul className='title'>
								<li>{this.props.pageName}</li>
							</ul>
							<ul className='navigation'>
								<li><Link  className='link' to='/'>Home</Link></li>
								<li><Link  className='link' to='Entry'>Entry</Link></li> 
							</ul>
							<ul className='toolbar'>
								<li><FontAwesomeIcon className='save' icon={faSave} onClick={this.props.save}/></li>
							</ul>
						</div>
					</div>
				</div>
			</header>			
		);
	}
}

//								<li><FontAwesomeIcon className='arrow-up' icon={faArrowUp} onClick={this.props.save}/></li>
	// constructor(props){
	// 	super(props);
	// 	this.handleFullScreen = this.handleFullScreen;
	// 	this.state = {fullscreen: false};
	// }
	
	// this.toggleScreen = (e) =>{
	// 	if(this.state.fullscreen == true)
	// 	{
	// 		this.setState({fullscreen: false})
	// 	}
	// 	else{
	// 		this.setState({fullscreen: true});
	// 	}
		
	// }

	// render(){
	// 	if(fullscreen == false){
	// 		return <li><img src="" onClick={this.toggleScreen}/></li>
	// 	}
	// 	else{

	// 		return <li><img src="" onClick={this.toggleScreen}/></li>
	// 	}

	// }