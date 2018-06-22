import React from 'react';
import request from 'superagent';
import MediaQuery from 'react-responsive';

import Header from '../components/Header';
import ProfileImage from '../components/ProfileImage';
import Diary from '../components/Diary';
import {Editor, EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';

import MobileHeaderHome from '../components/MobileComponents/MobileHeaderComponents/MobileHeaderHome';
import MobileFilter from '../components/MobileComponents/MobileFilter';
import MobileJournalDisplay from '../components/MobileComponents/MobileJournalDisplay';
import MobileFooterHome from '../components/MobileComponents/MobileFooterComponents/MobileFooterHome';

export default class Entry extends React.Component{
	constructor(props){
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
		this.entryEventHandler = this.entryEventHandler.bind(this);
		this.saveEventHandler = this.saveEventHandler.bind(this);
	}
//////////////////////////////////////////////////////
/* event handler that updates the editor state text */
//////////////////////////////////////////////////////
	entryEventHandler = (editorState) => {
		console.log(this.state.editorState);
		this.setState({editorState});
	}
//////////////////////////////////////////////////////
/* save handler that saves entry to db */
//////////////////////////////////////////////////////
	saveEventHandler(e){
		const { editorState } = this.state;
		const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

		console.log(data);
	    e.preventDefault();

	    let that=this;
	    request
		.post('http://localhost:3001/save')
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.set('authorization', 'bearer ' + localStorage.getItem('token'))
		.send( {data: data} )
		.end(function(err, res){
			const clearedEditorState = EditorState.push(editorState, ContentState.createFromText(''));
			that.setState({editorState: clearedEditorState});
			console.log(data);
		});  
	  }

	render(){
		const isAuth = this.props.authenticate();
		if(isAuth)
		{
			return (
			<div>
				<MediaQuery minWidth={896}>
					<Header pageName='Entry' save={this.saveEventHandler}/>
					<ProfileImage />
					<Diary options={this.entryEventHandler} editorState={this.state.editorState}/>
				</MediaQuery>
				<MediaQuery maxWidth={895}>
					<MobileHeaderHome />
					<Diary options={this.entryEventHandler} editorState={this.state.editorState}/>
					<MobileFooterHome />	
				</MediaQuery>
			</div>
			)
		} else {
			window.location.reload();
		}
	}
};