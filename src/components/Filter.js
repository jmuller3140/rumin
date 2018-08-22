import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/fontawesome-free-solid/';
import ReactTooltip from 'react-tooltip';
import MediaQuery from 'react-responsive';

import FilterMonth from './FilterComponents/FilterMonth';
import FilterDay from './FilterComponents/FilterDay';
import FilterYear from './FilterComponents/FilterYear';
import './Filter.css';


const Filter = (props) =>{

		const style={ width:'250px', letterSpacing: '.1em', fontFamily:'garamond'};
		const title="Your journal entries dated on or before the specified date will appear. The left box indicates the day, the middle box the month, and the right box indicates the year."
		return(
		<div>
			<div className='filter-container'>
				<div className='filter-wrapper'>
					<FilterDay {...props} />
					<FilterMonth {...props}/>
					<FilterYear {...props }/>
				</div>
			</div>
			<MediaQuery minWidth={1040}>
				<FontAwesomeIcon data-tip={true} data-for='infoTooltip' id='info-icon' icon={faInfoCircle}/>
		   		<ReactTooltip id='infoTooltip' place="right" type='dark' effect='solid'>
  					<p style={style}>{title}</p>
				</ReactTooltip>
			</MediaQuery>
		</div>
			)
}


export default Filter;
