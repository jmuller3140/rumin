import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/fontawesome-free-solid/';
import ReactTooltip from 'react-tooltip';

import './FilterYear.css';


export default class FilterYear extends React.Component{
	constructor(props){
		super(props);

	}


	render(){
		const {onChange, onChangeYear} = this.props;
		const style={ width:'250px', letterSpacing: '.1em', fontFamily:'garamond'};
		const props = this.props;
		const title="Your journal entries dated the day of, or before the date shown will appear. With the left box indicated the day, the middle box the month, and the right box indicates the year."
		return(
			<div className='filterYear-contents'>
				<input className='filterYear-input' value={onChangeYear} id='onChangeYear'onChange={(e)=> onChange(e)} type='number' />
				<FontAwesomeIcon data-tip={true} data-for='infoTooltip' id='info-icon' icon={faInfoCircle}/>
		   		<ReactTooltip id='infoTooltip' place="right" type='dark' effect='solid'>
  					<p style={style}>{title}</p>
				</ReactTooltip>
			</div>
			)
		}
}