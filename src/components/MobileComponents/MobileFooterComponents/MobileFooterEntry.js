import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHome, faCog, faSave, faPencilAlt} from '@fortawesome/fontawesome-free-solid/';

import './MobileFooterHome.css';




export default class MobileFooterHome extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
				<div className="mobile-footer-container">
						<Link  className='link-footer' to='/'><FontAwesomeIcon className='mobile-home-icon' icon={faHome} /><p>Home</p></Link>				
						<Link  className='link-footer' to='Entry'><FontAwesomeIcon className='mobile-pencil-icon' icon={faPencilAlt} /><p>Entry</p></Link>
						<Link  className='link-footer' to='Entry'><FontAwesomeIcon icon={faSave} className='save' onClick={this.props.save}/><p>Save</p></Link>
				</div>
		)
	}
}