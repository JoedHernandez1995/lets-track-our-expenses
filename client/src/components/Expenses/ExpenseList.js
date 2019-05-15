import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NewExpense from './NewExpense';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Sidebar from '../AppComponents/Sidebar';
import MUIDataTable from "mui-datatables";

import axios from 'axios';
import '../styles/App.css';

class ExpenseList extends Component {

	constructor(){
		super();
		this.state = {
			expenses: [],
			totalExpenses: 0.0,
			todaySpent: 0.0,
			totalExpensesCurrentMonth: 0.0,
			remainingBudget: 0.0,
		}
	}

	componentWillMount(){

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
	   		c.setState({todaySpent: response.data.todaySpent});
	   		c.setState({totalExpensesCurrentMonth: response.data.totalExpensesCurrentMonth});
	   		c.setState({remainingBudget: response.data.remainingBudget});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	viewExpense(rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }){
		var c = this.componentInstance;
		var currentExpenseIndex = rowMeta.dataIndex;
		var expenseID = c.state.expenses[currentExpenseIndex].id;
		c.props.history.push({
			pathname: '/expenses/viewExpense',
			state: {
				id: expenseID
			}
		});
		
	}

	deleteExpense(rowsDeleted: array){
		var c = this.componentInstance; 
		var promises = [];
		var apiURL = "http://localhost:5000/expenses/deleteExpenseByExpenseId";

		//Since these are concurrent calls, I am using promises to wait for all requests before continuing
		for(var i = 0; i < rowsDeleted.data.length; i++){
			var dataIndex = rowsDeleted.data[i].dataIndex;
			var expenseObject = c.state.expenses[dataIndex];
			var payload = {
				id: expenseObject.id
			}
			promises.push(axios.post(apiURL, payload));
		}

		console.log(promises);

		axios.all(promises)
		.then(function(response){
			console.log("RESPONSE");
			console.log(response);
			console.log(response.length)
			for(var i = 0; i < response.length; i++){
				var index = response[i].data.deletedIndex;
				c.state.expenses.splice(index, 1);
			}
			if(response.length > 1){
				toast.info("Expenses have been deleted!");
			}else if(response.length == 1){
				toast.info("Expense has been deleted!");
			}
			
		})
		.catch(function (error){
			toast.error("An error has occured!");
		});
	}

	render() {

		const columns = [
			{
		  		name: "location",
		  		label: "Label",
		  		options: {
		   			filter: false,
		   			sort: true,
		  		}	
		 	},
		 	{
		  		name: "cost",
		  		label: "Cost (L)",
		  		options: {
		   			filter: false,
		   			sort: true,
		  		}	
		 	},
		 	{
		  		name: "expenseType",
		  		label: "Expense Type",
		  		options: {
		   			filter: true,
		   			sort: false,
		  		}	
		 	},
		 	{
		  		name: "category",
		  		label: "Category",
		  		options: {
		   			filter: true,
		   			sort: false,
		  		}	
		 	},
		 	{
		  		name: "date",
		  		label: "Date",
		  		options: {
		   			filter: false,
		   			sort: true,
		  		}	
		 	},
		 
		];

		const options = {
			componentInstance: this,
		  	filterType: 'dropdown',
		  	print: false,
		  	downloadOptions: {
		  		filename: 'expense-list.csv', 
		  	},
		  	onRowClick: this.viewExpense,
		  	onRowsDelete: this.deleteExpense
		};

		return (
			<div className={'safeAreaMargin'}>
				<Sidebar />
				<h1>Expenses</h1>

				<div style={{flex: 1, marginLeft: '20px', marginRight: '20px'}}>
					<Grid container spacing={8}>
						<Grid item xs={3}>
							<Card style={{backgroundColor: '#0092B3', color: 'white'}}>
								<CardContent>
									<h5 className={'smallCardHeader'}>Spent Today: </h5>
									<h3>L. {this.state.todaySpent}</h3>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card style={{backgroundColor: '#FF823B', color: 'white'}}>
								<CardContent>
									<h5 className={'smallCardHeader'}>Spent This Month: </h5>
									<h3>L. {this.state.totalExpensesCurrentMonth}</h3>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card style={{backgroundColor: '#FF6262', color: 'white'}}>
								<CardContent>
									<h5 className={'smallCardHeader'}>Total Spent Overall: </h5>
									<h3>L. {this.state.totalExpenses}</h3>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card style={{backgroundColor: '#59AD4D', color: 'white'}}>
								<CardContent>
									<h5 className={'smallCardHeader'}>Remaining Budget: </h5>
									<h3>L. {this.state.remainingBudget} </h3>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</div>
				<br />
				<div style={{flex: 1, marginLeft: '20px', marginRight: '20px'}}>
					<Grid container spacing={8}>
						<Grid item xs={12}>
							<MUIDataTable
								title={"Expense List"}
								data={this.state.expenses}
								columns={columns}
								options={options}
							/>	
						</Grid>
					</Grid>
				</div>
				<br />
				<br />
				<br />
				<br />
				<Tooltip title="Add New Expense" aria-label="Add New Expense">
					<Fab component={Link} to='/expenses/newExpense' color="primary" aria-label="Add" style={{position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'green'}}>
				 		<AddIcon />
				  	</Fab>
				</Tooltip>
				<ToastContainer autoClose={4000} />
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ExpenseList;