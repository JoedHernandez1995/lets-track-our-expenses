import React, { Component } from 'react';
import '../styles/App.css';
import {Bar,Line} from 'react-chartjs-2';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Sidebar from '../AppComponents/Sidebar';

import axios from 'axios';

var date = new Date();
var year = date.getFullYear();
var month = ((date.getMonth()) + 1).toString();
month = month.length > 1 ? month : "0" + month;
var day = (date.getDate()).toString();
day = day.length > 1 ? day : "0" + day;

var startDate = month + "/" + "01/"+year;
var endDate = month + "/" + day + "/" + year;

class Dashboard extends Component {


	constructor(){
		super();
		this.state = {
			dashBoardData: {},
			startDate: startDate,
			endDate: endDate
		}
	}

	componentDidMount(){
		this.getFullDashboardData();
	}

	parseDate(date){
		var date = new Date(date);
		var year = date.getFullYear();
		var month = ((date.getMonth()) + 1).toString();
		month = month.length > 1 ? month : "0" + month;
		var day = (date.getDate()).toString();
		day = day.length > 1 ? day : "0" + day;
		return month + "/" + day + "/" + year;
	}

	handleStartDateChange = (date: any) => {
		this.setState({startDate:this.parseDate(date)});
	}

	handleEndDateChange = (date: any) => {
		this.setState({endDate:this.parseDate(date)});
	}

	getFullDashboardData(){
		var c = this;
		var apiURL = "http://localhost:5000/expenses/getFullDashboardData";
		var payload = {
			UserId: JSON.parse(localStorage.getItem("user")).UserId,
			startDate: this.state.startDate,
			endDate: this.state.endDate
		}
		axios.post(apiURL, payload)
	   	.then(function (response) {
	   		c.setState({dashBoardData: response.data})
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	handleClick(event){
		this.getFullDashboardData();
	}

	render() {

		return (

			<div className={'safeAreaMargin'}>
				<Sidebar />
				<h1>Dashboard</h1>

					<Grid container spacing={8}>

						<Grid item xs={12}>
							<Card style={{marginLeft: '20px', marginRight: '20px'}}>
								<CardContent>
									<h4>Filter by Date Range </h4><br />

									<form noValidate>
										<Grid container spacing={24}>

											<MuiPickersUtilsProvider utils={DateFnsUtils}>
										    	<Grid item xs={5}>
										          	<DatePicker
										            	margin="normal"
										            	label="Start Date"
										            	format="MM/dd/yyyy"
										            	value={this.state.startDate}
										            	onChange={this.handleStartDateChange}
										          	/>
										        </Grid>
										  	</MuiPickersUtilsProvider>

										  	<MuiPickersUtilsProvider utils={DateFnsUtils}>
										    	<Grid item xs={5}>
										          	<DatePicker
										            	margin="normal"
										            	label="End Date"
										            	format="MM/dd/yyyy"
										            	value={this.state.endDate}
										            	onChange={this.handleEndDateChange}
										          	/>
										        </Grid>
										  	</MuiPickersUtilsProvider>
											<Grid item xs={2}>
												<Button variant="contained" color="secondary" onClick={(event) => this.handleClick(event)}>
											        Search
											  	</Button>
											</Grid>
										</Grid>
								    </form>
								</CardContent>
							</Card>
						</Grid>
					</Grid>

					<br />
					<Grid container spacing={8}>
						<Grid item xs={12}>
							<Card style={{marginLeft: '20px', marginRight: '20px'}}>
								<CardContent>
									<h5>Money Spent by Category</h5>
									<br />
									<Bar
							          	data={this.state.dashBoardData.expensesByCategories}
							          	width={100}
							          	height={300}
							          	options={{
							            	maintainAspectRatio: false
							          	}}
							        />
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<br />
					<Grid container spacing={8}>
						<Grid item xs={12}>
							<Card style={{marginLeft: '20px', marginRight: '20px'}}>
								<CardContent>
									<h5>Money Earned by Income Type</h5>
									<br />
									<Bar
							          	data={this.state.dashBoardData.incomeByTypes}
							          	width={100}
							          	height={300}
							          	options={{
							            	maintainAspectRatio: false
							          	}}
							        />
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<br />
					<Grid container spacing={8}>
						<Grid item xs={12}>
							<Card style={{marginLeft: '20px', marginRight: '20px'}}>
								<CardContent>
									<h5>Expenses vs Income</h5>
									<br />
									<Line
							          	data={this.state.dashBoardData.incomeVsExpense}
							          	width={100}
							          	height={300}
							          	options={{
							            	maintainAspectRatio: false
							          	}}
							        />
								</CardContent>
							</Card>
						</Grid>
					</Grid>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Dashboard;