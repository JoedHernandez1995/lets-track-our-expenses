import React, { Component } from 'react';
import '../styles/App.css';
import {Bar} from 'react-chartjs-2';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';

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
	   					label: "Expense Categories Current Month",
	   					data: response.data.data,
	   					backgroundColor: ["#c29ed7","#ad3111","#cde916","#5f2908","#d82b77","#c48e20","#fd887a","#2f9ba1"]

	   				}
	   			]
	   		}
	   		c.setState({data: dataObject})
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<h1 style={{color: '#FFFFFF'}}>Dashboard</h1>

				<Grid container spacing={8}>
						<Grid item xs={12}>
							<Card>
								<CardContent>
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
				
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Dashboard;