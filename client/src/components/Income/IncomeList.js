import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import axios from 'axios';

class Income extends Component {
	constructor(){
		super();
		this.state = {
			
		}
	}

	componentDidMount(){
		this.getAllIncomesFromServer();
	}

	getAllIncomesFromServer(){
		var totalExpenses = 0;
		var totalIncome = 0;
		var c = this;
		var apiURL = "http://localhost:5000/incomes/getAllIncomesByUserId";
		var payload = {
			UserId: JSON.parse(localStorage.getItem("user")).UserId
		}
		axios.get(apiURL, payload)
	   	.then(function (response) {
	   		console.log(response);
	   		//c.setState({expenses: response.data});
	   		//response.data.map(expense => totalExpenses += expense.cost);
	   		//c.setState({remainingIncome: totalIncome - totalExpenses});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
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