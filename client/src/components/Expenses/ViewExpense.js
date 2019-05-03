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

	handleClick(){
		console.log("UPDATE!");
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

				<TextField
					hintText="Enter Expense Type"
					floatingLabelText={this.state.expenseType}
					onChange = {(event, newValue) => this.setState({expenseType:newValue})}
				/>

				<TextField
					hintText="Enter Category"
					floatingLabelText={this.state.category}
					onChange = {(event, newValue) => this.setState({category:newValue})}
				/>

				<TextField
					hintText="Enter SubCategory"
					floatingLabelText={this.state.subcategory}
					onChange = {(event, newValue) => this.setState({subcategory:newValue})}
				/>

				<TextField
					hintText="Enter Label"
					floatingLabelText={this.state.label}
					onChange = {(event, newValue) => this.setState({label:newValue})}
				/>

				<TextField
					hintText="Enter Note"
					floatingLabelText={this.state.note}
					onChange = {(event, newValue) => this.setState({note:newValue})}
				/>

				<TextField
					hintText="Enter Date"
					floatingLabelText={this.state.date}
					onChange = {(event, newValue) => this.setState({date:newValue})}
				/>

				<TextField
					hintText="Enter Cost"
					floatingLabelText={this.state.cost}
					onChange = {(event, newValue) => this.setState({cost:newValue})}
				/>

				<br/>
		    	<RaisedButton label="Update" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>

				<Link to={'/expenses'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ViewExpense;