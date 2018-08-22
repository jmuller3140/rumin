import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faHome, faSave, faPencilAlt} from '@fortawesome/fontawesome-free-solid/';

import './MobileFooterHome.css';

const MobileFooterHome = (props) => {
		const { save } = props;
		return(
				<div className="mobile-footer-container">
						<Link  className='link-footer' to='/'><FontAwesomeIcon className='mobile-home-icon' icon={faHome} /><p>Home</p></Link>
						<Link  className='link-footer' to='Entry'><FontAwesomeIcon className='mobile-pencil-icon' icon={faPencilAlt} /><p>Entry</p></Link>
						<Link  className='link-footer' to='Entry'><FontAwesomeIcon icon={faSave} className='save' onClick={save}/><p>Save</p></Link>
				</div>
		)
}

MobileFooterHome.propTypes = {
	save: PropTypes.func
}

export default MobileFooterHome;
