import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/fontawesome-free-solid/';

import './MobileHeaderHome.css'


export default class MobileHeaderHome extends React.Component{
	constructor(){
		super();
	}


	render(){
		return(
			<div id="mobile-header-container">
				<div id="mobile-bars-wrapper">
					<FontAwesomeIcon id='mobile-bars' icon={faBars} />
				</div>
				<div id="mobile-title-wrapper">
					<p id="mobile-title">Rumin</p>
				</div>
			</div>)
	}

}