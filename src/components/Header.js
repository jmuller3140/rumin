import React from 'react';

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
	const propsHeader = this.props;
	if(this.state.pageName === "Login"){
		this.setState({htmlInjection: <HeaderLogin pageName='R u m i n' /> });
	}
	else if(this.state.pageName === "Entry"){
			this.setState({htmlInjection:  <HeaderEntry  {...propsHeader } /> });
	}
	else if(this.state.pageName === "Register"){
		this.setState({htmlInjection: <HeaderLogin pageName='R u m i n'/>});
	}
	else if(this.state.pageName === "Home"){
		this.setState({htmlInjection: <HeaderHome {...propsHeader} />}
		);
	}
}

	render() {
		return (<div>{this.state.htmlInjection}</div>)
	}
}
