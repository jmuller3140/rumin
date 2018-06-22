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
			<div className="mobile-header-container">
					<p className="mobile-title">Rumin</p>
			</div>)
	}

}



// // 				<div id="mobile-bars-wrapper">
// 					<FontAwesomeIcon id='mobile-bars' icon={faBars} />
// 				</div>