import React from 'react';
import Autosuggest from 'react-autosuggest';

import './FilterMonth.css';


export default class FilterMonth extends React.Component{
	constructor(props){
		super(props);

	}
			

	render(){

    const { months } = this.props;
    const value = this.props.onChangeMonth;
    const theme = { 
    	input: {
		    border: '1px solid #aaa',
		    borderTopLeftRadius: '5px',
		    borderTopRightRadius: '5px',
		    borderBottomLeftRadius: '5px',
		    borderBottomRightRadius: '5px',
		    borderColor: 'grey',
		    padding: '10px',
		    fontFamily: 'MoonLight',
		    letterSpacing: '.1em',
		    textAlign: 'center'
    	},
    	inputFocused: {
    		outline: 'none'
    	}
    }

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a month',
      value,
      onChange: this.props.onChangeMonthHandler
    };
		return(
			<div className='filterMonth-contents'>
		      <Autosuggest 
		        theme={theme}
		        suggestions={this.props.months}
		        onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
		        onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
		        getSuggestionValue={this.props.getSuggestionValue}
		        renderSuggestion={this.props.renderSuggestion}
		        inputProps={inputProps}
		      />
			</div>
		)
	}
}