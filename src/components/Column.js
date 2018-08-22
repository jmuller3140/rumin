import React from 'react';
import {CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types';

import './Column.css';

const Column = (props) => {

		const {id, dateString, sampleText, editorState, onClick} = props;
		return (
			<CSSTransition in={true} timeout={1000} classNames="journal" appear={true}>
				<div className='journalEntry-content' key={id} onClick={(e) => onClick(editorState, id, e)} >
					<div className='journalEntry-content-container'>
						<div className='journalEntry-date'>
							{dateString}
						</div>
						<div className='journalEntry-text'>
							<p>{sampleText}</p>
						</div>
					</div>
				</div>
			</CSSTransition>
		)
}

Column.propTypes = {
	id: PropTypes.string,
	dateString: PropTypes.string,
	sampleText: PropTypes.string,
	editorState: PropTypes.object,
	onClick: PropTypes.func
}



export default Column;



