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
	}

	componentDidMount(){
	if(this.state.pageName === "Login"){
		this.setState({htmlInjection: <HeaderLogin pageName='R u m i n'/> });
	}
	else if(this.state.pageName === "Entry"){
			this.setState({htmlInjection:  <HeaderEntry pageName='Entry' save={this.props.save}/> });		
	}
	else if(this.state.pageName === "Register"){
		this.setState({htmlInjection: <div><p>{this.state.pageName}</p></div>});
	}
	else if(this.state.pageName === "Home"){
		this.setState({htmlInjection: <HeaderHome pageName='Home'/>}
		);
	}
}

	render() {
		return (<div>{this.state.htmlInjection}</div>)
	}
}
