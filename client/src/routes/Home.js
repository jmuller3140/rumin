import React from 'react';
import {Editor, EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import {CSSTransition} from 'react-transition-group';
import request from 'superagent';
import {Redirect} from 'react-router-dom';

import Header from '../components/Header';
import ProfileImage from '../components/ProfileImage';
import JournalDisplay from '../components/JournalDisplay';
import Filter from '../components/Filter';
export default class Home extends React.Component {
	constructor(props){
		super(props);
		// Variables for the filtering boxes
		this.onChange = this.onChange.bind(this);
		this.onChangeMonthHandler = this.onChangeMonthHandler.bind(this);
		this.getSuggestions = this.getSuggestions.bind(this);
		this.getSuggestionValue = this.getSuggestionValue.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.months = [{name: 'january'}, {name: 'february'}, {name: 'march'}, 
					{name:'april'},{name:'may'},{name:'june'},{name:'july'},
					{name:'august'},{name:'september'},{name:'october'},
					{name: 'november'}, {name:'december'}];
		this.currentDate = new Date();
		//Variables for the Journal Display
		this.onClickHandler = this.onClickHandler.bind(this);
		this.onClickHighlighted = this.onClickHighlighted.bind(this);
		this.filter = this.filter.bind(this);
		this.deleteEntry = this.deleteEntry.bind(this);
		this.editEntry = this.editEntry.bind(this);
		this.entryEventHandler = this.entryEventHandler.bind(this);
		this.changeEditState = this.changeEditState.bind(this);

		this.state = {onChangeDay: this.currentDate.getDate(), onChangeMonth: this.months[this.currentDate.getMonth()].name, months: [], onChangeYear: this.currentDate.getFullYear(), 
					entries: [{id:1, dateTime: "", sampleText:"", dateString: "", editorState: EditorState.createEmpty()}], 
					highlightedEditorState: EditorState.createEmpty(), highlightedEditorCopy: EditorState.createEmpty(), highlightedId: "", visible: false, readOnlyEntry: true };

	}
	//////////////////////////////////////////
	/*handler for changing values of inputs*/
	//////////////////////////////////////////
	onChange = (e) => {
	    this.setState({
	     [e.target.id] : e.target.value
	    });
	  }
	///////////////////////////////////////////////////
	/*handler for changing value of the month input*/
	//////////////////////////////////////////////////
	 onChangeMonthHandler = (event, { newValue }) => {
		    this.setState({
		      onChangeMonth: newValue
		    });
		  };
	//////////////////////////////////////////
	/*handler for changing values of month suggestions based on typing*/
	//////////////////////////////////////////
	 getSuggestions = value => {
		  const inputValue = value.trim().toLowerCase();
		  const inputLength = inputValue.length;

		  return inputLength === 0 ? [] : this.months.filter(month =>
		    month.name.toLowerCase().slice(0, inputLength) === inputValue
		  );
		};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
		getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
        renderSuggestion = suggestion => (
						  <div>
						    {suggestion.name}
						  </div>
						);


		  // Autosuggest will call this function every time you need to update suggestions.
		  // You already implemented this logic above, so just use it.
		  onSuggestionsFetchRequested = ({ value }) => {
		    this.setState({
		      months: this.getSuggestions(value)
		    });
		  };

		  // Autosuggest will call this function every time you need to clear suggestions.
		  onSuggestionsClearRequested = () => {
		    this.setState({
		      months: []
		    });
		  };		

/////////////////////////////////////////////////
/* onClickHandler to highlight full entry text */
/////////////////////////////////////////////////
	onClickHandler(editorState, id, e){
		this.setState({visible: true});
		this.setState({highlightedEditorState: editorState});
		this.setState({highlightedId: id});
		console.log(this.state.highlightedId);
	}
///////////////////////////////////
/* gets rid of popup entery text */
///////////////////////////////////
	onClickHighlighted(action, e){
		if(action){
			this.setState({visible: false});
		}
	else{
			e.stopPropagation();
		}
	}
/////////////////////////////////////////////////////////////////////
/* filter function that adds entries to display before filter date */
/////////////////////////////////////////////////////////////////////
	filter(dayFilter, monthFilter, yearFilter, entries){
		let len = entries.length;
		let filterArray = [];
		for(var i = 0; i<len; i++){
			let yearIndex = entries[i].dateTime.indexOf('/');
			let year = parseInt(entries[i].dateTime.slice(0, yearIndex));

			let monthIndex = entries[i].dateTime.indexOf('/', yearIndex + 1);
			let month = parseInt(entries[i].dateTime.slice(yearIndex + 1, monthIndex));
			let monthNames = {january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
        july: 7, august:8, september:9, october:10, november:11, december: 12};
        	let monthValue = monthNames[monthFilter];

			let dayIndex = entries[i].dateTime.indexOf(' ', monthIndex + 1);
			let day = parseInt(entries[i].dateTime.slice(monthIndex + 1, dayIndex));


			if(year < yearFilter){
				filterArray.push(entries[i]);
			}
			else if(year == yearFilter){
				if(month < monthValue){
					filterArray.push(entries[i]);
				} 
				else if(month == monthValue){
					if(day <= dayFilter){
						filterArray.push(entries[i]);
					}
				}
			}
		}
		return filterArray;
	}

	///////////////////
	/* deletes entry */
	///////////////////
	deleteEntry(id, e){

		const data = {id: id};
		console.log(data);
	    e.preventDefault();

	    let that=this;
	    request
		.post('http://localhost:3001/')
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.set('authorization', 'bearer ' + localStorage.getItem('token'))
		.send( data )
		.end(function(err, res){
			that.setState({visible: false});
			if(res.status == 200){
				window.location.reload();
			}
		});
	}
	//////////////////////////
	/* saves edits on entry */
	//////////////////////////
	editEntry(editorState, id, e){
		const editorStateConverted = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
		const data = {id: id, editorStateConverted: editorStateConverted};
		console.log(data);

	    let that=this;
	    request
		.put('http://localhost:3001/')
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.set('authorization', 'bearer ' + localStorage.getItem('token'))
		.send( data )
		.end(function(err, res){
			that.setState({visible: false});
			if(res.status == 200){
				console.log(res);
				window.location.reload();
			}
		});
	}

	///////////////////
	/* edits entry */
	///////////////////

	entryEventHandler = (highlightedEditorState) => {
		console.log(this.state.highlightedEditorState);
		this.setState({highlightedEditorState});
	}
	///////////////////
	/* edits entry */
	///////////////////	
	changeEditState(cancel, e){
		if(cancel){
			this.setState({highlightedEditorState: this.state.highlightedEditorCopy});
			this.setState({readOnlyEntry: !this.state.readOnlyEntry});
		}else{
			this.setState({readOnlyEntry: !this.state.readOnlyEntry});
			this.setState({highlightedEditorCopy: this.state.highlightedEditorState});
		}
	}
/////////////////////////////////////////////////////////
/* calls post request to retrieve user journal entries */
/////////////////////////////////////////////////////////
	componentDidMount(){
	    fetch('http://localhost:3001/', {
	     method: 'get',
	     headers: {'Content-Type':'application/json',
	                'Accept': 'application/json',
	            	'authorization': 'bearer ' + localStorage.getItem('token')}
	    })
	    .then(res => res.json())
	    .then(data => {
	      if(data.length != 0){
	      	const dataArray = [];
	      	for(var i=0; i<data.length; i++){
	      		const { dateString, id, dateTime } = data[i];
	      		const content = convertFromRaw(JSON.parse(data[i].entry));
	      		const sampleText = content.getPlainText('').slice(0, 500) + '......';
	      		const convertedEntry = EditorState.createWithContent(content);
	      		const instance = { dateTime: dateTime, dateString: dateString, id: id, editorState: convertedEntry, sampleText: sampleText };
	      		dataArray.push(instance);

	      	}
	      	this.setState({entries: dataArray});
	      	console.log(this.state.entries);
	      }

	})
}

	render(){
		const isAuth = this.props.authenticate();
		if(isAuth)
		{
			const propsFilter = {onChange: this.onChange, 
			 					  onChangeMonthHandler: this.onChangeMonthHandler, 
			 					  months: this.state.months,
			 					  onChangeMonth: this.state.onChangeMonth, 
			 					  onChangeDay: this.state.onChangeDay,
			 					  onChangeYear: this.state.onChangeYear,
			 					 getSuggestions: this.getSuggestions,
								 getSuggestionValue: this.getSuggestionValue,
								 renderSuggestion: this.renderSuggestion,
								 onSuggestionsClearRequested: this.onSuggestionsClearRequested,
								 onSuggestionsFetchRequested: this.onSuggestionsFetchRequested, 
								 currentDate: this.currentDate };

			const {onChangeDay, onChangeMonth, onChangeYear} = this.state;
			const filteredArray = this.filter(onChangeDay, onChangeMonth, onChangeYear, this.state.entries);

			const propsJournal = {entries: filteredArray, 
								visible: this.state.visible, 
								onClickHighlighted: this.onClickHighlighted, 
								onClickHandler: this.onClickHandler, 
								highlightedEditorState: this.state.highlightedEditorState,
								hightlightedEditorCopy: this.state.highlightedEditorCopy, 
								highlightedId:this.state.highlightedId,
								deleteEntry: this.deleteEntry,
								editEntry: this.editEntry,
								entryEventHandler: this.entryEventHandler,
								changeEditState: this.changeEditState,
								readOnlyEntry: this.state.readOnlyEntry
							};
			return  (
			<div>
				<Header pageName='Home' />
				<ProfileImage/>
				<Filter {...propsFilter} />
				<JournalDisplay {...propsJournal} />
			</div>
			)
		}
		else {
			var url = window.location.href;    
			if (url.indexOf('?') > -1){
			   url += '&msg=logout';
			}else{
			   url += '?msg=logout';
			}
			window.location.href = url;
		}
	}
};

