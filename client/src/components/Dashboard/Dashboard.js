import React, { Component } from 'react';
import '../styles/App.css';
import {Bar,Line} from 'react-chartjs-2';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import axios from 'axios';



class Dashboard extends Component {


	constructor(){
		super();
		this.state = {
			data: {}
		}
	}

	componentWillMount(){
		var c = this;
		var apiURL = "http://localhost:5000/expenses/getExpensesCategoryDataByUserIdAndDateRange";
		var payload = {
			UserId: JSON.parse(localStorage.getItem("user")).UserId,
			startDate: "04/01/2019",
			endDate: "05/09/2019"
		}
		axios.post(apiURL, payload)
	   	.then(function (response) {

	   		console.log(response)
	   		var dataObject = {
	   			labels: response.data.labels,
	   			datasets: [
	   				{
	   						label: "Categories",
	   						data: response.data.data,
	   						backgroundColor: 'rgba(255,99,132,0.2)',
					      	borderColor: 'rgba(255,99,132,1)',
					      	borderWidth: 1,
					      	hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					      	hoverBorderColor: 'rgba(255,99,132,1)',
	   				}
	   			]
	   		}
	   		c.setState({data: dataObject})
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	handleClick(event){

	}

	render() {

		const LineData = {
		  	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		  	datasets: [
		    	{
		      		label: 'Expenses',
		      		fill: false,
			      	lineTension: 0.1,
			      	backgroundColor: 'rgba(75,192,192,0.4)',
			      	borderColor: 'rgba(75,192,192,1)',
			      	borderCapStyle: 'butt',
			      	borderDash: [],
			      	borderDashOffset: 0.0,
			      	borderJoinStyle: 'miter',
			      	pointBorderColor: 'rgba(75,192,192,1)',
			      	pointBackgroundColor: '#fff',
			      	pointBorderWidth: 1,
			      	pointHoverRadius: 5,
			      	pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			      	pointHoverBorderColor: 'rgba(220,220,220,1)',
			      	pointHoverBorderWidth: 2,
			      	pointRadius: 1,
			      	pointHitRadius: 10,
			      	data: [65, 59, 80, 81, 56, 55, 40]
		    	},

		    	{
		      		label: 'Income',
		      		fill: false,
			      	lineTension: 0.1,
			      	backgroundColor: 'rgba(75,192,192,0.4)',
			      	borderColor: 'rgba(75,192,192,1)',
			      	borderCapStyle: 'butt',
			      	borderDash: [],
			      	borderDashOffset: 0.0,
			      	borderJoinStyle: 'miter',
			      	pointBorderColor: 'rgba(75,192,192,1)',
			      	pointBackgroundColor: '#fff',
			      	pointBorderWidth: 1,
			      	pointHoverRadius: 5,
			      	pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			      	pointHoverBorderColor: 'rgba(220,220,220,1)',
			      	pointHoverBorderWidth: 2,
			      	pointRadius: 1,
			      	pointHitRadius: 10,
			      	data: [400, 300, 150, 80, 375, 325, 500]
		    	}
		  	]
		};
		return (
			<div className={'safeAreaMargin'}>
				<h1 style={{color: '#FFFFFF'}}>Dashboard</h1>

					<Grid container spacing={8}>

						<Grid item xs={12}>
							<Card style={{marginLeft: '20px', marginRight: '20px'}}>
								<CardContent>
									<h4>Filter by Date Range </h4><br />

									<form noValidate>
										<Grid container spacing={24}>

											<Grid item xs={5}>
												<TextField
										        	id="date"
										        	label="Start Date"
										        	type="date"
										        	defaultValue="2017-05-24"
										        	
										        	InputLabelProps={{
										          		shrink: true,
										        	}}
										      	/>
											</Grid>
											<Grid item xs={5}>
												<TextField
										        	id="date"
										        	label="End Date"
										        	type="date"
										        	defaultValue="2017-05-24"
										        	
										        	InputLabelProps={{
										          		shrink: true,
										        	}}
										      	/>
											</Grid>
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
							          	data={this.state.data}
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
							          	data={LineData}
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