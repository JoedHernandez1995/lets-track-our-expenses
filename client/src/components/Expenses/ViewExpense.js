import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

import '../styles/App.css';

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
		
	}

	handleClick(){
		var apiURL = "http://localhost:5000/expenses/updateExpenseByExpenseId";
		var self = this;
	    var payload = {
	    	"expenseType": this.state.expenseType,
			"category": this.state.category,
			"subcategory": this.state.subcategory,
			"location": this.state.location,
			"note": this.state.note,
			"date": this.state.date,
			"cost": parseFloat(this.state.cost),
			"UserId": JSON.parse(localStorage.getItem("user")).UserId,
			"id": this.props.location.state.id
	    }
	    axios.post(apiURL, payload)
	   	.then(function (response) {
	    	console.log(response);
	     	if(response.data.code == 200){
	      		console.log("Expense updated successfull");
	    
	     	}
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
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
	   		c.setState({location: response.data[0].location});
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
			<div className={'safeAreaMargin'}>
				<MuiThemeProvider>
					<h1>View Expense</h1>

					<h5>ID: {this.state.id}</h5>

					<TextField
						hintText="Enter Expense Type"
						value={this.state.expenseType}
						floatingLabelText="Expense Type"
						onChange = {(event, newValue) => this.setState({expenseType:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter Category"
						value={this.state.category}
						floatingLabelText="Category"
						onChange = {(event, newValue) => this.setState({category:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter SubCategory"
						value={this.state.subcategory}
						floatingLabelText="Sub Category"
						onChange = {(event, newValue) => this.setState({subcategory:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter Label"
						value={this.state.location}
						floatingLabelText="Label"
						onChange = {(event, newValue) => this.setState({location:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter Note"
						value={this.state.note}
						floatingLabelText="Notes"
						onChange = {(event, newValue) => this.setState({note:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter Date"
						value={this.state.date}
						floatingLabelText="Date"
						onChange = {(event, newValue) => this.setState({date:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter Cost"
						value={this.state.cost}
						floatingLabelText="Cost"
						onChange = {(event, newValue) => this.setState({cost:newValue})}
					/>
					<br/>
			    	<RaisedButton label="Update" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>

			    </MuiThemeProvider>
				<Link to={'/expenses'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ViewExpense;