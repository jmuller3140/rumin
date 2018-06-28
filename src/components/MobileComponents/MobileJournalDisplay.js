import React from 'react';
import jwtDecode from 'jwt-decode';
import {Editor, EditorState, convertFromRaw, convertToRaw, ContentState} from 'draft-js';
import {CSSTransition} from 'react-transition-group';

import MobileColumn from './MobileColumn';

import './MobileJournalDisplay.css';


export default class MobileJournalDisplay extends React.Component{
	constructor(props){
		super(props);
		this.state = {deletePopup: false, readOnlyEntry: true};
		this.sort = this.sort;
		this.onClickDeletePopup = this.onClickDeletePopup;
		this.changeDeleteState = this.changeDeleteState;
		this.changeEditState = this.changeEditState;
	}
///////////////////////////////////////////////
/* shows and hides confirmation entry delete */
///////////////////////////////////////////////
	changeDeleteState(e){
		this.setState({deletePopup: !this.state.deletePopup});
	}

/////////////////////////////////////////////////////
/* sorts entries and disperses them into 3 columns */
/////////////////////////////////////////////////////
	sort(unSorted){
		 if(unSorted.length >= 1 && unSorted[0].id !== 1){
		let column = [];
		 for(var i = 0; i < unSorted.length; i++){
				column.push(unSorted[i]);

		}
		let columnDisplay = column.map((post) => {
			let props = {id: post.id, onClick: this.props.onClickHandler, dateString: post.dateString, sampleText: post.sampleText, editorState: post.editorState};
			return (<MobileColumn {...props} />)
			}
		);

		return (
			<div>
				<div className='mobile-column-display'>
					 {columnDisplay}
				</div>
			</div>
			)
		}
	}

	render(){

		const dateMap = this.sort(this.props.entries);
		return (
			<div>
	
					<div id='mobile-journalEntry-container'>
							{dateMap}
					</div> 

				{this.props.visible && (
						<div className='mobile-journal-highlighted-container' onClick={(e) => this.props.onClickHighlighted(true, e)}>
							<div className='mobile-journal-highlighted-wrapper' onClick={(e) => this.props.onClickHighlighted(false, e)}>
								<button className='btn-delete-popup' onClick={(e) => {
																				this.props.onClickHighlighted(false, e);  
																				this.changeDeleteState(e);
																			}}>Delete</button>
								{this.props.readOnlyEntry && (<button className='btn-edit-entry' onClick={(e) => {
																				this.props.onClickHighlighted(false, e);  
																				this.props.changeEditState(false, e);
																			}}>Edit</button>
								)}
								{!this.props.readOnlyEntry && (<button className='btn-save-entry' onClick={(e) => {
																				this.props.onClickHighlighted(false, e);  
																				this.props.editEntry(this.props.highlightedEditorState, this.props.highlightedId, e);
																			}}>Save</button>
								)}
								{!this.props.readOnlyEntry && (<button className='btn-cancel-entry' onClick={(e) => {
																				this.props.onClickHighlighted(false, e);  
																				this.props.changeEditState(true, e);
																			}}>Cancel</button>
								)}								
								<div className='journal-highlighted' onClick={(e) => this.props.onClickHighlighted(false, e)} >
									<Editor editorState={this.props.highlightedEditorState} readOnly={this.props.readOnlyEntry} onChange={this.props.entryEventHandler}/>
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
