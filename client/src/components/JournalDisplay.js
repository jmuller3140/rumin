import React from 'react';
import jwtDecode from 'jwt-decode';
import {Editor, EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import {CSSTransition} from 'react-transition-group';

import Column from './Column';

import './JournalDisplay.css';


export default class JournalDisplay extends React.Component{
	constructor(props){
		super(props);
		this.state = {deletePopup: false};
		this.sort = this.sort;
		this.onClickDeletePopup = this.onClickDeletePopup;
		this.changeDeleteState = this.changeDeleteState;
	}

	changeDeleteState(e){
		this.setState({deletePopup: !this.state.deletePopup});
	}

	sort(unSorted){
		 if(unSorted.length >= 1 && unSorted[0].id !== 1){
		let firstColumn = [], secondColumn = [], thirdColumn = [];
		for(var i = 0; i < unSorted.length; i++){
			if(firstColumn.length == thirdColumn.length || firstColumn.length == undefined){
				firstColumn.push(unSorted[i]);
			}
			else if(firstColumn.length > secondColumn.length){
				secondColumn.push(unSorted[i]);
			}
			else if(secondColumn.length > thirdColumn.length){
				thirdColumn.push(unSorted[i]);
			}
		}
		let left = firstColumn.map((post) => {
			let props = {id: post.id, columnSection: 'left', onClick: this.props.onClickHandler, dateString: post.dateString, sampleText: post.sampleText, editorState: post.editorState};
			return (<Column {...props} />)
			}
		);

		let middle = secondColumn.map((post) => {
			let props = {id: post.id, columnSection: 'middle', onClick: this.props.onClickHandler, dateString: post.dateString, sampleText: post.sampleText, editorState: post.editorState};
			return (<Column {...props} />)
			}
		);
		let right = thirdColumn.map((post) =>{
			let props = {id: post.id, columnSection: 'right', onClick: this.props.onClickHandler, dateString: post.dateString, sampleText: post.sampleText, editorState: post.editorState};
			return (<Column {...props} />)
			}
		);

		return (
			<div>
						<div className='left-column'>
						 {left}
						</div>
						<div className='middle-column'>
						{middle}
						</div>
						<div className='right-column'>
						{right}
						</div>
				</div>
			)
		}
		else{ 
			return
		}
	}



	render(){

		const dateMap = this.sort(this.props.entries);
		return (
			<div>
	
					<div className='journalEntry-container'>
						<div className='journalEntry-wrapper'>
							{dateMap}
						</div>
					</div> 

				{this.props.visible && (
						<div className='journal-highlighted-container' onClick={(e) => this.props.onClickHighlighted(true, e)}>
							<div className='journal-highlighted-wrapper' onClick={(e) => this.props.onClickHighlighted(false, e)}>
								<button className='btn-delete-popup' onClick={(e) => {
																				this.props.onClickHighlighted(false, e);  
																				this.changeDeleteState(e);
																			}}>Delete</button>
								<div className='journal-highlighted' onClick={(e) => this.props.onClickHighlighted(false, e)} >
									<Editor editorState={this.props.highlightedEditorState} readOnly={false} />
								</div>
							</div>
						</div>
					)}
				{this.state.deletePopup && (
					<div className='deletePopup-container'>
					<div className='deletePop-wrapper'>
						<div className='deletePopup-content'>
							<p>Are you sure you want to delete this entry?</p> 
						</div>
						<div className='delete-btns'>
							<button className='deletePopup-yes' onClick={(e) => {this.props.deleteEntry( this.props.highlightedId, e); this.changeDeleteState(e);}}>Yes</button>
							<button className='deletePopup-no' onClick={(e) => this.changeDeleteState(e) }>No</button>
						</div>
					</div>
					</div>
					)}
			</div>
		)
	}

}


