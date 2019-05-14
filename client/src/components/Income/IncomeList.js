import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from "mui-datatables";

import axios from 'axios';

import '../styles/App.css';

class Income extends Component {
	constructor(){
		super();
		this.state = {
			incomeList: [],
			todayEarned: 0.0,
			totalIncomeCurrentMonth: 0.0,
			totalIncome: 0.0,
			remainingBudget: 0.0
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
	   		c.setState({todayEarned: response.data.todayEarned});
	   		c.setState({totalIncomeCurrentMonth: response.data.totalIncomeCurrentMonth});
	   		c.setState({remainingBudget: response.data.remainingBudget});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	viewExpense(rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }){
		/*var c = this.componentInstance;
		var currentExpenseIndex = rowMeta.dataIndex;
		var expenseID = c.state.expenses[currentExpenseIndex].id;
		c.props.history.push({
			pathname: '/expenses/viewExpense',
			state: {
				id: expenseID
			}
		});*/
		
	}

	deleteExpense(rowsDeleted: array){
		/*var c = this.componentInstance; 
		var promises = [];
		var apiURL = "http://localhost:5000/expenses/deleteExpenseByExpenseId";

		//Since these are concurrent calls, I am using promises to wait for all requests before continuing
		for(var i = 0; i < rowsDeleted.data.length; i++){
			var dataIndex = rowsDeleted.data[i].dataIndex;
			var expenseObject = c.state.expenses[dataIndex];
			var payload = {
				id: expenseObject.id,
				index: dataIndex
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
		});*/
	}

	render() {
		const columns = [
			{
		  		name: "label",
		  		label: "Label",
		  		options: {
		   			filter: false,
		   			sort: true,
		  		}	
		 	},
		 	{
		  		name: "amount",
		  		label: "Amount (L)",
		  		options: {
		   			filter: false,
		   			sort: true,
		  		}	
		 	},
		 	{
		  		name: "incomeType",
		  		label: "Income Type",
		  		options: {
		   			filter: true,
		   			sort: false,
		  		}	
		 	},
		 	{
		  		name: "incomeTypeCategory",
		  		label: "Income Type Category",
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
		  		filename: 'income-list.csv', 
		  	},
		  	onRowClick: this.viewIncome,
		  	onRowsDelete: this.deleteIncome
		};


		return (
			<div className={'safeAreaMargin'}>
				<h1>Income</h1>
				<div style={{flex: 1, marginLeft: '20px', marginRight: '20px'}}>
					<Grid container spacing={8}>
						<Grid item xs={3}>
							<Card style={{backgroundColor: '#0092B3', color: 'white'}}>
								<CardContent>
									<h5 className={'smallCardHeader'}>Earned Today: </h5>
									<h3>L. {this.state.todayEarned}</h3>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card style={{backgroundColor: '#FF823B', color: 'white'}}>
								<CardContent>
									<h5 className={'smallCardHeader'}>Earned This Month: </h5>
									<h3>L. {this.state.totalIncomeCurrentMonth}</h3>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={3}>
							<Card style={{backgroundColor: '#FF6262', color: 'white'}}>
								<CardContent>
									<h5 className={'smallCardHeader'}>Total Earned Overall: </h5>
									<h3>L. {this.state.totalIncome}</h3>
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
								title={"Income List"}
								data={this.state.incomeList}
								columns={columns}
								options={options}
							/>	
						</Grid>
					</Grid>
				</div>
				<br />
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