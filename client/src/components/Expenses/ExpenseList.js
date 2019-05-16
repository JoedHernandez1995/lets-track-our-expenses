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

var date = new Date();
var year = date.getFullYear();
var month = ((date.getMonth()) + 1).toString();
var day = (date.getDate()).toString();
var today = month + "/" + day + "/" + year;

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

	componentDidMount(){
		this.getAllExpensesFromServer();
	}

	getAllExpensesFromServer(){
		var c = this;
		var apiURL = "https://lets-track-our-expenses.herokuapp.com/expenses/getAllExpensesByUserId";
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

	   		//Detect highest category on which money is being spent

	   		var data = response.data.totalsByCategory;

	   		if (response.data.expenseList.length == 0){
	   			toast.info(`Hey ${JSON.parse(localStorage.getItem("user")).firstName} ${JSON.parse(localStorage.getItem("user")).lastName} You haven't spent a single dime!`);
	   		}else{
	   			var max = data.reduce(function(prev,current){
		   			return (prev.categoryTotal > current.categoryTotal) ? prev : current;
		   		});

		   		switch(max.categoryName){
		   			case "General":
		   				toast.info(`You are spending your money without a cause!`);
		   				break;
		   			case "Personal":
		   				toast.info(`You like treating yourself a little too much huh?`);
		   				break;
		   			case "House":
		   				toast.info(`Looks like you need a new place to live!`);
		   				break;
		   			case "Food & Drinks":
		   				toast.info(`Have you considered meal prepping?`);
		   				break;
		   			case "Transport":
		   				toast.info(`Having a car is like having a child.`);
		   				break;
		   			case "Clothes":
		   				toast.info(`You sure enjoy being fashion!`);
		   				break;
		   			case "Fun":
		   				toast.info(`You only live once`);
		   				break; 
		   			case "Miscellaneous":
		   				toast.info(`Gifts? Donations? I don't know but your money is going somewhere.`);
		   				break;
		   			default:
		   				toast.info(`Your money just dissappeard into nothingness!`);
		   				break;
		   		}
	   		}

	   		
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

	getCurrentMonth(){
		var date = new Date();
		var m = date.getMonth();
		m += 1;
		return m
	}


	getMonthFromDate(input){
		var date = new Date(input);
		var m = date.getMonth();
		m += 1;
		return m 
	}

	deleteExpense = (event,rowsDeleted: array) => {
		console.log(this);
		console.log(event);
		console.log(rowsDeleted);
		var c = this.componentInstance; 
		var promises = [];
		var apiURL = "https://lets-track-our-expenses.herokuapp.com/expenses/deleteExpenseByExpenseId";

		/*//Since these are concurrent calls, I am using promises to wait for all requests before continuing
		for(var i = 0; i < rowsDeleted.data.length; i++){
			var dataIndex = rowsDeleted.data[i].dataIndex;
			var expenseObject = c.state.expenses[dataIndex];
			//Check if today
			if (expenseObject.date == today){
				c.setState({todaySpent: c.state.todaySpent - expenseObject.cost});
			}
			//Check if currentMonth
			if(c.getMonthFromDate(expenseObject.date) == c.getCurrentMonth()){
				c.setState({totalExpensesCurrentMonth: c.state.totalExpensesCurrentMonth - expenseObject.cost});
			}
			c.setState({totalExpenses: c.state.totalExpenses - expenseObject.cost});
			c.setState({remainingBudget: c.state.remainingBudget + c.state.totalExpenses});
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
			console.log(response.length);
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
		});*/
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
		  	print: false,
		  	filter: false,
		  	viewColumns: false,
		  	downloadOptions: {
		  		filename: 'expense-list.csv', 
		  	},
		  	onRowClick: this.viewExpense,
		  	onRowsDelete: (event, rowsDeleted) => this.deleteExpense(event, rowsDeleted)
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