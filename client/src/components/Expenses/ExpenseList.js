import React, { Component } from 'react';

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
				<NewExpense />
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ExpenseList;