import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Editor, EditorState} from 'draft-js';

import './Diary.css';
import 'draft-js/dist/Draft.css';


export default class Diary extends React.Component{
		render(){
			return(
				<div className="middle-container" >
					<CSSTransition in={true} timeout={500} appear={true} classNames="diary">
						<div className="diaryField">
							<Editor placeholder="What is on your mind?" editorState={this.props.editorState} onChange={this.props.options} />
						</div>
					</CSSTransition>
				</div>
				)
		}
}



						// <form className='diaryForm'>
						// 	<textarea name='diaryField' onChange={this.props.options} className='diaryField' placeholder='What is on your mind?'>
						// 	</textarea>
						// </form>
					// <CSSTransition in={true} timeout={500} appear={true} classNames="diary">
					// <Editor editorState={this.props.editorState} onChange={this.props.options} />
					// </CSSTransition>