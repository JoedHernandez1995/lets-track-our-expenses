import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

class ViewExpense extends Component {

	constructor(){
		super();
		this.state = {
			id: 0,
			expenseType: '',
			category: '',
			subcategory: '',
			label: '',
			note: '',
			date: '',
			cost: 0.0
		}
	}

	componentDidMount(){
		this.setState({id: this.props.location.state.id});
		this.getExpenseDataFromServer();
	}

	getExpenseDataFromServer(){
		var c = this;
		var apiURL = "http://localhost:5000/expenses/getExpenseDataByIdAndUserId";
		var payload = {
			UserId: JSON.parse(localStorage.getItem("user")).UserId,
			id: c.props.location.state.id
		}
		axios.post(apiURL, payload)
	   	.then(function (response) {
	   		console.log(response);
	   		c.setState({id: c.props.location.state.id});
	   		c.setState({expenseType: response.data[0].expenseType});
	   		c.setState({category: response.data[0].category});
	   		c.setState({subcategory: response.data[0].subcategory});
	   		c.setState({label: response.data[0].location});
	   		c.setState({note: response.data[0].note});
	   		c.setState({date: response.data[0].date});
	   		c.setState({cost: response.data[0].cost});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div>
				<h1>View Expense</h1>

				<h5>ID: {this.state.id}</h5>
				<h5>Type: {this.state.expenseType}</h5>
				<h5>Category: {this.state.category}</h5>
				<h5>SubCategory: {this.state.subcategory}</h5>
				<h5>Label: {this.state.label}</h5>
				<h5>Note: {this.state.note}</h5>
				<h5>Date: {this.state.date}</h5>
				<h5>Cost: {this.state.cost}</h5>

				<Link to={'/expenses'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ViewExpense;