import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NewExpense from './NewExpense';

import axios from 'axios';

class ExpenseList extends Component {


	constructor(){
		super();
		this.state = {
			expenses: []
		}
	}


	componentDidMount(){
		this.getAllExpensesFromServer();
	}

	getAllExpensesFromServer(){
		var c = this;
		var apiURL = "http://localhost:5000/getAllExpenses";
		axios.get(apiURL)
	   	.then(function (response) {
	   		c.setState({expenses: response.data});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}



	render() {
		const expenses = this.getAllExpensesFromServer();
		return (
			<div>
				<h1>Expenses</h1>
				{this.state.expenses.map(expense => {
					return <li>{expense.location}</li>
				})}
				<Link to={'/expenses/newExpense'}> Add NewExpense </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ExpenseList;