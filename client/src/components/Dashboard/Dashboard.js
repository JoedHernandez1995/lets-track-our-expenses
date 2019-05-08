import React, { Component } from 'react';
import '../styles/App.css';
import {Bar} from 'react-chartjs-2';

import axios from 'axios';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
}




class Dashboard extends Component {
	constructor(){
		super();
		this.state = {
			
		}
	}

	componentDidMount(){
		var c = this;
		var apiURL = "http://localhost:5000/expenses/getExpensesCategoryDataByUserIdAndDateRange";
		var payload = {
			UserId: JSON.parse(localStorage.getItem("user")).UserId,
			startDate: "04/01/2019",
			endDate: "05/07/2019"
		}
		axios.post(apiURL, payload)
	   	.then(function (response) {
	   		console.log(response)
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<h1 style={{color: '#FFFFFF'}}>Dashboard</h1>
				<Bar
		          data={data}
		          width={100}
		          height={50}
		          options={{
		            maintainAspectRatio: false
		          }}
		        />
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Dashboard;