import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import axios from 'axios';

import '../styles/App.css';

class Income extends Component {
	constructor(){
		super();
		this.state = {
			incomeList: [],
			totalIncome: [],

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
		axios.post(apiURL, payload)
	   	.then(function (response) {
	   		c.setState({incomeList: response.data.incomeList});
	   		c.setState({totalIncome: response.data.totalIncome});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	deleteIncome(incomeID,index){
		var c = this;
		var apiURL = "http://localhost:5000/expenses/deleteIncomeByIncomeId";
		var payload = {
			id: incomeID
		}
		axios.post(apiURL, payload)
	   	.then(function (response) {
	   		c.state.expenses.splice(index,1);
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<h1>Income</h1>
				<br></br>
				<h5>Total Income: {this.state.totalIncome} </h5>
				<br></br>
				{this.state.incomeList.map((income,index) => {
					return <li>
								{income.label}
								<Link to={{ pathname: '/income/viewIncome', state: {id: income.id}}}> View </Link>  
								<a onClick={(event) => this.deleteIncome(income.id,index)}> Delete </a>
							</li>
				})}
				<br></br>
				<Link to={'/income/newIncome'}> Add NewIncome </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Income;