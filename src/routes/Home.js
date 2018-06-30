import React from 'react';
import {Editor, EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import {CSSTransition} from 'react-transition-group';
import request from 'superagent';
import {Redirect} from 'react-router-dom';
import MediaQuery from 'react-responsive';

import Header from '../components/Header';
import ProfileImage from '../components/ProfileImage';
import JournalDisplay from '../components/JournalDisplay';
import Filter from '../components/Filter';
import MobileHeaderHome from '../components/MobileComponents/MobileHeaderComponents/MobileHeaderHome';
import MobileFilter from '../components/MobileComponents/MobileFilter';
import MobileJournalDisplay from '../components/MobileComponents/MobileJournalDisplay';
import MobileFooterHome from '../components/MobileComponents/MobileFooterComponents/MobileFooterHome';


export default class Home extends React.Component {
	constructor(props){
		super(props);

		this.onClickLogoutHandler = this.onClickLogoutHandler.bind(this);
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

		this.state = {isJournalEmpty: false, isLoading: false, onChangeDay: this.currentDate.getDate(), onChangeMonth: this.months[this.currentDate.getMonth()].name, months: [], onChangeYear: this.currentDate.getFullYear(), 
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
	 onChangeMonthHandler = (event) => {
	 	console.log(event);
		    this.setState({
		      onChangeMonth: event.value
		    });
		  };
	///////////////////////////////////////////////////
	/*clears local storage*/
	//////////////////////////////////////////////////		  
	onClickLogoutHandler = (e) => {
		localStorage.clear();
		window.location.reload();
	}
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
	    this.setState({isLoading: true});
	    let that=this;
		request
		.get('http://localhost:3001/')
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.set('authorization', 'bearer ' + localStorage.getItem('token'))
		.send()
	    .end(function(err, res){
	    	if(res.status === 200){
		      if(res.body.length != 0){
		      	console.log(res.body);
		      	const dataArray = [];
		      	for(var i=0; i<res.body.length; i++){
		      		const { dateString, id, dateTime } = res.body[i];
		      		const content = convertFromRaw(JSON.parse(res.body[i].entry));
		      		let sampleText = content.getPlainText('').slice(0, 500);
		      		if(sampleText.length === 500){
		      			sampleText = sampleText + '......';
		      		}
		      		const convertedEntry = EditorState.createWithContent(content);
		      		const instance = { dateTime: dateTime, dateString: dateString, id: id, editorState: convertedEntry, sampleText: sampleText };
		      		dataArray.push(instance);
		      	}
		      	that.setState({entries: dataArray});
		      	that.setState({isLoading: false});
		    	}
		    	else if(res.body.length === 0){
		    		that.setState({isJournalEmpty: true});
		    		that.setState({isLoading: false});
		    	}
	      }

	})
}

	render(){
		const isAuth = this.props.authenticate();
		if(isAuth === "authenticated")
		{
			const propsFilter = {onChange: this.onChange, 
			 					  onChangeMonthHandler: this.onChangeMonthHandler, 
			 					  months: this.months,
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
								readOnlyEntry: this.state.readOnlyEntry,
								isLoading: this.state.isLoading,
								isJournalEmpty: this.state.isJournalEmpty
							};
			const propsHeader = {title: 'RUMIN', pageName: 'Home', logout: this.onClickLogoutHandler, showSettings: true};
			return  (
			<div>
				<MediaQuery minWidth={896}>
					<Header {...propsHeader} />
					<ProfileImage/>
					<Filter {...propsFilter} />
					<JournalDisplay {...propsJournal} />
				</MediaQuery>
				<MediaQuery maxWidth={895}>
					<MobileHeaderHome {...propsHeader}/>
					<MobileFilter {...propsFilter}/>
					<MobileJournalDisplay {...propsJournal}/>
					<MobileFooterHome />	
				</MediaQuery>
			</div>
			)
		}
		else if(isAuth === "expire"){
			var url = window.location.href;    
			url += '?msg=expire';
			window.location.href = url;
		} else if(isAuth === "logout"){
			window.location.reload();
		}
	}
};

