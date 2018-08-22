import React from 'react';
import {CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types';

import './Column.css';

const Column = (props) => {

		const {id, dateString, sampleText, editorState} = this.props;
		this.onClick = this.props.onClick;
		return (
			<CSSTransition in={true} timeout={1000} classNames="journal" appear={true}>
				<div className='journalEntry-content' key={id} onClick={(e) => this.onClick(editorState, id, e)} >
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
	id: PropTypes.int,
	dateString: PropTypes.String,
	sampleText: PropTypes.String,
	editorState: PropTypes.object
}



export default Column;



