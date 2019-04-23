import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NewExpense from './NewExpense';

class ExpenseList extends Component {
	constructor(){
		super();
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<h1>Expenses</h1>
				<Link to={'/expenses/newExpense'}> Add NewExpense </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ExpenseList;