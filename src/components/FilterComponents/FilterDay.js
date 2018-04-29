import React from 'react';
import NumericInput from 'react-numeric-input';

import './FilterDay.css';


export default class FilterDay extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		const {onChange, onChangeDay} = this.props;
		return(
			<div className='filterDay-contents'>
				<input className='filterDay-input' value={onChangeDay} id='onChangeDay' onChange={(e)=> onChange(e)} type='number' />
			</div>
			)
	}
}