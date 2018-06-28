import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faSave, faArrowUp} from '@fortawesome/fontawesome-free-solid/';
import ReactTooltip from 'react-tooltip';


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
		const style={ width:'75px', letterSpacing: '.1em', fontFamily:'garamond', textAlign:'center'};
		const props = this.props;
		const title="Save Entry"
		return (
			<header>
				<div className="navbar-container">
							<ul className='userName'>
								<li>{this.state.firstName} {this.state.lastName}</li>
							</ul>
							<ul className='logout'>
								<li><Link className='link' to='/' onClick={this.props.logout}>Logout</Link></li>
							</ul>
							<ul className='title-entry'>
								<li>{this.props.pageName}</li>
							</ul>
							<ul className='toolbar'>
								<li><FontAwesomeIcon data-tip={true} data-for='infoTooltip' icon={faSave} className='save' onClick={this.props.save}/></li>
						   		<ReactTooltip id='infoTooltip' place="bottom" type='dark' effect='solid'>
				  					<p style={style}>{title}</p>
								</ReactTooltip>
							</ul>
							<ul className='navigation'>
								<li><Link  className='link' to='/'>Home</Link></li>
								<li><Link  className='link' to='Entry'>Entry</Link></li> 
							</ul>
				</div>
			</header>			
		);
	}
}

//					<div className="navbar-content-wrapper">



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