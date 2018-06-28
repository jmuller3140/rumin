import React from 'react';
import request from 'superagent';
import MediaQuery from 'react-responsive';

import Header from '../components/Header';
import ProfileImage from '../components/ProfileImage';
import Diary from '../components/Diary';
import {Editor, EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js';
import { ToastContainer, toast } from 'react-toastify';

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
		this.addNotification = this.addNotification.bind(this);
	}
//////////////////////////////////////////////////////
/* event handler that updates the editor state text */
//////////////////////////////////////////////////////
	entryEventHandler = (editorState) => {
		console.log(this.state.editorState);
		this.setState({editorState});
	}

	 addNotification = (msg, type) => toast(msg, {
	  type: type,
      position: toast.POSITION.BOTTOM_RIGHT,
      hideProgressBar: true
  });
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
			if(res.status === 200){
				const clearedEditorState = EditorState.push(editorState, ContentState.createFromText(''));
				that.setState({editorState: clearedEditorState});
				that.addNotification("Your journal entry was saved.", toast.TYPE.SUCCESS);
			}else{
				that.addNotification("Your journal entry was not saved. Try again.", toast.TYPE.ERROR);
			}
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
					<ToastContainer toastClassName="toast"  />
				</MediaQuery>
				<MediaQuery maxWidth={895}>
					<MobileHeaderHome />
					<Diary options={this.entryEventHandler} editorState={this.state.editorState}/>
					<MobileFooterHome />	
					<ToastContainer toastClassName="toast"  />
				</MediaQuery>
			</div>
			)
		} else {
			window.location.reload();
		}
	}
};