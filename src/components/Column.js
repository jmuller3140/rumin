import React from 'react';
import {CSSTransition} from 'react-transition-group';

import './JournalDisplay.css';

export default class Column extends React.Component{

	constructor(props){
		super(props);
		
	}

	render(){
		const {id, dateString, sampleText, columnSection, editorState} = this.props;
		console.log(id);
		const className= 'journalEntry-content-container-' + columnSection;
		this.onClick = this.props.onClick;
		return (
			<CSSTransition in={true} timeout={1000} classNames="journal" appear={true}>
				<div className='journalEntry-content' key={id} onClick={(e) => this.onClick(editorState, id, e)} > 
					<div className={className}>
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
}