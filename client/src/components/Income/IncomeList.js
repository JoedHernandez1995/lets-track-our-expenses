import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MUIDataTable from "mui-datatables";
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../AppComponents/Sidebar';

import axios from 'axios';

import '../styles/App.css';

var date = new Date();
var year = date.getFullYear();
var month = ((date.getMonth()) + 1).toString();
var day = (date.getDate()).toString();
var today = month + "/" + day + "/" + year;

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
		var apiURL = "https://lets-track-our-expenses.herokuapp.com/incomes/getAllIncomesByUserId";
		//var apiURL = "http://localhost:5000/incomes/getAllIncomesByUserId";
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

	viewIncome = (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
		var currentIncomeIndex = rowMeta.dataIndex;
		var incomeID = this.state.incomeList[currentIncomeIndex].id;
		this.props.history.push({
			pathname: '/income/viewIncome',
			state: {
				id: incomeID
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
		  	filterType: 'dropdown',
		  	print: false,
		  	filter: false,
		  	viewColumns: false,
		  	selectableRows: "none",
		  	downloadOptions: {
		  		filename: 'income-list.csv', 
		  	},
		  	onRowClick: this.viewIncome
		};


		return (
			<div className={'safeAreaMargin'}>
				<Sidebar />
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
				<Tooltip title="Add New Income" aria-label="Add New Expense">
					<Fab component={Link} to='/income/newIncome' color="primary" aria-label="Add" style={{position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'green'}}>
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

export default Income;