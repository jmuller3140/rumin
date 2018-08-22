import React from 'react';
import PropTypes from 'prop-types'
import {CSSTransition} from 'react-transition-group';

import './MobileColumn.css';

const MobileColumn = (props) => {

		const {id, sampleText, dateString, editorState} = props;
		let smallerText = "";
		if(sampleText.length > 100){
			const index = sampleText.indexOf(" ", 100);
			smallerText = sampleText.slice(0,index);
		} else{
			smallerText = sampleText;
		}
		const className= 'mobile-journalEntry-content-container';
		this.onClick = this.props.onClick;
		return (
			<CSSTransition in={true} timeout={1000} classNames="mobile-journal" appear={true}>
				<div className='mobile-journalEntry-content' key={id} onClick={(e) => this.onClick(editorState, id, e)} >
					<div className={className}>
						<div className='mobile-journalEntry-date'>
							{dateString}
						</div>
						<div className='mobile-journalEntry-text'>
							<p>{smallerText}</p>
						</div>
					</div>
				</div>
			</CSSTransition>
		)
}

MobileColumn.propTypes = {
	id: PropTypes.int,
	sampleText: PropTypes.string,
	dateString: PropTypes.string,
	editorState: PropTypes.object

}


export default MobileColumn;

