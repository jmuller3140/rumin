import React from 'react';
import request from 'superagent';

import Header from '../components/Header';
import ProfileImage from '../components/ProfileImage';
import Diary from '../components/Diary';
import {Editor, EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';

export default class Entry extends React.Component{
	constructor(props){
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
		this.entryEventHandler = this.entryEventHandler.bind(this);
		this.saveEventHandler = this.saveEventHandler.bind(this);
	}

	entryEventHandler = (editorState) => {
		console.log(this.state.editorState);
		this.setState({editorState});
	}

	saveEventHandler(e){
		// console.log("hit the save button");

		const { editorState } = this.state;
		const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
		// const adata = convertToRaw(convertFromRaw(data));
		console.log(data);
	    e.preventDefault();

	    let that=this;
	    request
		.post('http://localhost:3001/save')
		.set('Content-Type', 'application/json')
		.set('Accept', 'application/json')
		.send( {data: data} )
		.end(function(err, res){
			const clearedEditorState = EditorState.push(editorState, ContentState.createFromText(''));
			that.setState({editorState: clearedEditorState});
			console.log(data);
		});  
	  }

	render(){
		return (
		<div>
			<Header pageName='Entry' save={this.saveEventHandler}/>
			<ProfileImage />
			<Diary options={this.entryEventHandler} editorState={this.state.editorState}/>
		</div>
		)
	}
};
			 // <ProfileImage />