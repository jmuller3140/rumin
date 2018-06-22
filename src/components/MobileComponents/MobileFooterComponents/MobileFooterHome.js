import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHome, faPencilAlt} from '@fortawesome/fontawesome-free-solid/';

import './MobileFooterHome.css';




export default class MobileFooterHome extends React.Component {
	constructor(){
		super();
	}

	render(){
		return(
			<div className="mobile-footer-container">
					<Link  className='link' to='/'><FontAwesomeIcon className='mobile-home-icon' icon={faHome} /></Link>				
					<Link  className='link' to='Entry'><FontAwesomeIcon className='mobile-pencil-icon' icon={faPencilAlt} /></Link>
			</div>)
	}
}