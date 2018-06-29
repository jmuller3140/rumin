import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSave from '@fortawesome/fontawesome-free-solid/faSave';

import HeaderEntry from './HeaderComponents/HeaderEntry';
import HeaderHome from './HeaderComponents/HeaderHome';
import HeaderLogin from './HeaderComponents/HeaderLogin';

export default class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pageName: this.props.pageName,
			htmlInjection: "",
			firstName: "",
			lastName: ""
		};
		this.onClickLogoutHandler = this.onClickLogoutHandler.bind(this);
	}

	onClickLogoutHandler(e){
		localStorage.clear();
	}

	componentDidMount(){
	if(this.state.pageName === "Login"){
		let props = { pageName: 'Rumin' };
		this.setState({htmlInjection: <HeaderLogin pageName='R u m i n'/> });
	}
	else if(this.state.pageName === "Entry"){
			let props = { save: this.props.save, logout: this.onClickLogoutHandler, pageName: 'Entry' };
			this.setState({htmlInjection:  <HeaderEntry  {...props } /> });		
	}
	else if(this.state.pageName === "Register"){
		let props = { pageName: 'R u m i n' };
		this.setState({htmlInjection: <HeaderLogin pageName='R u m i n'/>});
	}
	else if(this.state.pageName === "Home"){
		let props = { logout: this.onClickLogoutHandler, pageName: 'Home' };
		this.setState({htmlInjection: <HeaderHome {...props} />}
		);
	}
}

	render() {
		return (<div>{this.state.htmlInjection}</div>)
	}
}
