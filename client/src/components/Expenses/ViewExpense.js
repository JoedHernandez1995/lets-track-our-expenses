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
	   		c.setState({id: c.props.location.state.id});
	   		c.setState({expenseType: response.data.expenseType});
	   		c.setState({category: response.data.category});
	   		c.setState({subcategory: response.data.subcategory});
	   		c.setState({label: response.data.label});
	   		c.setState({note: response.data.note});
	   		c.setState({date: response.data.date});
	   		c.setState({cost: response.data.cost});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div>
				<h1>View Expense</h1>

				<h5>ID: </h5>
				<h5>Type: </h5>
				<h5>ID: </h5>
				<h5>ID: </h5>
				<h5>ID: </h5>
				<h5>ID: </h5>
				<h5>ID: </h5>
				<h5>ID: </h5>
				<Link to={'/expenses'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ViewExpense;