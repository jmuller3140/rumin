import React from 'react';

import './Header.css';


export default class HeaderLogin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageName: this.props.pageName
		}
	}
	render(){
		return (
			<header>
				<div className="navbar-container">
					<div className="navbar-content-wrapper">
						<div className="navbar-content">
							<ul className='loginTitle'>
								<li>{this.state.pageName}</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
			);
	}
}