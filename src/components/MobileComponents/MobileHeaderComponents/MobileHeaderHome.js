import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faBars, faCog} from '@fortawesome/fontawesome-free-solid/';

import './MobileHeaderHome.css'


export default class MobileHeaderHome extends React.Component{
	constructor(props){
		super(props);
		this.title = this.props.title;
		this.toggleState = this.toggleState.bind(this);
		this.state = {showCogMenu: false};
	}
	toggleState = (event, state) => {
		this.setState({showCogMenu: state});
	}

	render(){
		console.log(this.title);
		return(
			<div>
				<div className="mobile-header-container">
						<p className="mobile-title">{this.title}</p>
						{this.props.showSettings &&(<p onClick={(e)=> this.toggleState(e, true)}><FontAwesomeIcon className='mobile-cog-icon' icon={faCog} /></p>)}
				</div>
				{this.state.showCogMenu &&(
					<div className="mobile-settings-container">
						<button className="settings-item" onClick={(e)=> {this.toggleState(e, false); this.props.logout();} }>Logout</button>
						<button className="settings-item" onClick={(e)=> this.toggleState(e, false)}>Cancel</button>
					</div>)
				}
			</div>
			)
	}

}



// // 				<div id="mobile-bars-wrapper">
// 					<FontAwesomeIcon id='mobile-bars' icon={faBars} />
// 				</div>