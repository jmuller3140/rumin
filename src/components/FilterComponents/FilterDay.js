import React from 'react';
import PropTypes from 'prop-types';

import './FilterDay.css';

const FilterDay = (props) => {

		const {onChange, onChangeDay} = props;

		return(
			<div className='filterDay-contents'>
				<input className='filterDay-input' min="1" max="31" value={onChangeDay} id='onChangeDay' onChange={(e)=> onChange(e)} type='number' />
			</div>
			)
}

FilterDay.propTypes = {
	onChange: PropTypes.func,
	onChangeDay: PropTypes.number
}

export default FilterDay;
