import React from 'react';
import Select from 'react-select';

import './MobileFilter.css';
import 'react-select/dist/react-select.css';


export default class MobileFilter extends React.Component{
	constructor(props){
		super(props);
		console.log(this.props);
		this.state = { selectedOption: ''}; 
		this.handleChange = this.handleChange.bind(this);

	}
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
		// selectedOption can be null when the `x` (close) button is clicked
		if (selectedOption) {
    	console.log(`Selected: ${selectedOption.label}`);
		}
  }


	render(){
		const style={ width:'250px', letterSpacing: '.1em', fontFamily:'garamond'};
		const props = this.props;
		const {onChange, onChangeDay, onChangeYear, value, months} = this.props;
		const options = [{ value: months[0].name, label: 'January' }, { value: months[1].name, label: 'February' }, { value: months[2].name, label: 'March' }, { value: months[3].name, label: 'April' },
					    { value: months[4].name, label: 'May' }, { value: months[5].name, label: 'June' }, { value: months[6].name, label: 'July' }, { value: months[7].name, label: 'August' }, 
					    { value: months[8].name, label: 'September' }, { value: months[9].name, label: 'October' }, { value: months[10].name, label: 'November' }, { value: months[11].name, label: 'December' }];
		return(
		<div>
			<div className='mobile-filter-container'>
						<input className='mobile-filterDay' min="1" value={onChangeDay} id="onChangeDay" onChange={onChange} type='number' />
					    <Select name="form-field-name" className="mobile-filterMonth" value={this.props.onChangeMonth} onChange={(e)=>this.props.onChangeMonthHandler(e)}
					    options={options}/>
						<input className='mobile-filterYear' value={onChangeYear} id="onChangeYear" onChange={onChange} type='number' />
				</div>
		</div>
			)
	}
}