import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHome, faPencilAlt} from '@fortawesome/fontawesome-free-solid/';

import './MobileFooterHome.css';

const MobileFooterHome = () => {
		return(
			<div>
				<div className="mobile-footer-container">
						<Link  className='link-footer' to='/'><FontAwesomeIcon className='mobile-home-icon' icon={faHome} /><p>Home</p></Link>
						<Link  className='link-footer' to='Entry'><FontAwesomeIcon className='mobile-pencil-icon' icon={faPencilAlt} /><p>Entry</p></Link>
				</div>
			</div>)
}

export default MobileFooterHome
