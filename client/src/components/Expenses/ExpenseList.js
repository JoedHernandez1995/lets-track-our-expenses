import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NewExpense from './NewExpense';

import axios from 'axios';

class ExpenseList extends Component {


	constructor(){
		super();
		this.state = {
			expenses: [],
			remainingIncome: 0
		}
	}

	componentDidMount(){
		this.getAllExpensesFromServer();
	}

	getAllExpensesFromServer(){
		var totalExpenses = 0;
		var totalIncome = 0;
		var c = this;
		var apiURL = "http://localhost:5000/expenses/getAllExpensesByUserId";
		var payload = {
			UserId: JSON.parse(localStorage.getItem("user")).UserId
		}
		axios.get(apiURL, payload)
	   	.then(function (response) {
	   		console.log(response);
	   		c.setState({expenses: response.data});
	   		response.data.map(expense => totalExpenses += expense.cost);
	   		c.setState({remainingIncome: totalIncome - totalExpenses});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div>
				<h1>Expenses</h1>
				<h5>Remaining Income: </h5> {this.state.remainingIncome}
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