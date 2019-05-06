import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NewExpense from './NewExpense';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import '../styles/App.css';

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

	deleteExpense(expenseID,index){
		var c = this;
		var apiURL = "http://localhost:5000/expenses/deleteExpenseByExpenseId";
		var payload = {
			id: expenseID
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
				<h1 style={{color: '#FFFFFF'}}>Expenses</h1>

				<div style={{flex: 1, marginLeft: '20px', marginRight: '20px'}}>
					<Grid container spacing={8}>
						<Grid item xs={3}>
							<Card>
								<CardContent>
									<Typography>
										Remaining Budget: 
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card>
								<CardContent>
									<Typography>
										Remaining Budget: 
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card>
								<CardContent>
									<Typography>
										Remaining Budget: 
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card>
								<CardContent>
									<Typography>
										Remaining Budget: 
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={6}>
						</Grid>
					</Grid>
				</div>

				<div style={{flex: 1, marginLeft: '20px', marginRight: '20px'}}>
					<Grid container spacing={8}>
						<Grid item xs={12}>
							<Card>
								<CardContent>
									<Typography>
										Remaining Budget: 
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</div>
				
				<br></br>
				<h5>Total Expenses: {this.state.totalExpenses} </h5>
				<br></br>
				{this.state.expenses.map((expense,index) => {
					return <li>
								{expense.location} 
								<Link to={{ pathname: '/expenses/viewExpense', state: {id: expense.id}}}> View </Link> 
								<a onClick={(event) => this.deleteExpense(expense.id,index)}> Delete</a>
							</li>
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