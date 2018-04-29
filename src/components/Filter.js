import React from 'react';

import FilterMonth from './FilterComponents/FilterMonth';
import FilterDay from './FilterComponents/FilterDay';
import FilterYear from './FilterComponents/FilterYear';
import './Filter.css';


export default class Filter extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props);

	}


	render(){
		const props = this.props;
		return(
			<div className='filter-container'>
				<div className='filter-wrapper'>
					<FilterDay {...props} />
					<FilterMonth {...props}/>
					<FilterYear {...props }/>
				</div>
			</div>
			)
	}
}