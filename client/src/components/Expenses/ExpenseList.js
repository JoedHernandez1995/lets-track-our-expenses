import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NewExpense from './NewExpense';

import axios from 'axios';

class ExpenseList extends Component {


	constructor(){
		super();
		this.state = {
			expenses: [],
			totalExpenses: 0
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
		axios.post(apiURL, payload)
	   	.then(function (response) {
	   		c.setState({expenses: response.data.expenseList});
	   		c.setState({totalExpenses: response.data.totalExpenses});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div>
				<h1>Expenses</h1>
				<br></br>
				<h5>Total Expenses: {this.state.totalExpenses} </h5>
				<br></br>
				{this.state.expenses.map(expense => {
					return <li>{expense.location} <a href="/">View</a> <a href="/">Delete</a></li>
				})}
				<br></br>
				<Link to={'/expenses/newExpense'}> Add NewExpense </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ExpenseList;