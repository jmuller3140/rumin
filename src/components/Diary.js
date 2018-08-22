import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {Editor} from 'draft-js';
import PropTypes from 'prop-types';

import './Diary.css';
import 'draft-js/dist/Draft.css';


const Diary = (props) =>{
	const { editorState, options } = props;
			return (
				<div className="middle-container" >
					<CSSTransition in={true} timeout={500} appear={true} classNames="diary">
						<div className="diaryField">
							<Editor placeholder="What is on your mind?" editorState={editorState} onChange={options} />
						</div>
					</CSSTransition>
				</div>
				)
}

Diary.propTypes = {
	editorState: PropTypes.object,
	options: PropTypes.func
}

export default Diary
