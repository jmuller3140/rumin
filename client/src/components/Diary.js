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
