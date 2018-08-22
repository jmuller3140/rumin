import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/fontawesome-free-solid/';
import ReactTooltip from 'react-tooltip';

import './FilterYear.css';


const FilterYear = (props) => {

		const {onChange, onChangeYear} = props;
		const style={ width:'250px', letterSpacing: '.1em', fontFamily:'garamond'};
		const title="Your journal entries dated the day of, or before the date shown will appear. With the left box indicated the day, the middle box the month, and the right box indicates the year."
		return(
			<div className='filterYear-contents'>
				<input className='filterYear-input' value={onChangeYear} min="0" id='onChangeYear'onChange={(e)=> onChange(e)} type='number' />
				<FontAwesomeIcon data-tip={true} data-for='infoTooltip' id='info-icon' icon={faInfoCircle}/>
		   		<ReactTooltip id='infoTooltip' place="right" type='dark' effect='solid'>
  					<p style={style}>{title}</p>
				</ReactTooltip>
			</div>
			)
}

FilterYear.propTypes = {
	onChange: PropTypes.func,
	onChangeYear: PropTypes.number
}

export default FilterYear;
