import React, { Component } from 'react';

class NewExpense extends Component {
	constructor(props){
		super(props);
		this.state = {
			expenseType:'',
			category:'',
			subcategory:'',
			location:'',
			note:'',
			date:'',
			cost:''
		}
		
	}

	render() {
		return (
			<div>
				<h1>New Expense</h1>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default NewExpense;