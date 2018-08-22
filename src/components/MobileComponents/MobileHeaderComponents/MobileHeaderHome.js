import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/fontawesome-free-solid/';

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
						{this.props.showSettings &&(<p className='mobile-cog-icon' onClick={(e)=> this.toggleState(e, true)}><FontAwesomeIcon icon={faCog} /></p>)}
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
