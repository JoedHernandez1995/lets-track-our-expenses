import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Income extends Component {
	constructor(){
		super();
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<h1>Income</h1>
				<Link to={'/income/newIncome'}> Add NewIncome </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Income;