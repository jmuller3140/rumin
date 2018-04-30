import React from 'react';

import './FilterYear.css';


export default class FilterYear extends React.Component{
	constructor(props){
		super(props);

	}


	render(){
		const {onChange, onChangeYear} = this.props;
		return(
			<div className='filterYear-contents'>
				<input className='filterYear-input' value={onChangeYear} id='onChangeYear'onChange={(e)=> onChange(e)} type='number' />
			</div>
			)
		}
}