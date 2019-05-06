import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

import '../styles/App.css';

class ViewIncome extends Component {

	constructor(){
		super();
		this.state = {
			id: 0,
			amount: 0.0,
			label: '',
			date: '',
		}
	}

	componentDidMount(){

	}

	handleClick(){
		var apiURL = "http://localhost:5000/incomes/updateIncomeByIncomeId";
		var self = this;
	    var payload = {
	    	"amount": this.state.amount,
			"label": this.state.label,
			"UserId": JSON.parse(localStorage.getItem("user")).UserId,
			"id": this.props.location.state.id
	    }
	    axios.post(apiURL, payload)
	   	.then(function (response) {
	    	console.log(response);
	     	if(response.data.code == 200){
	      		console.log("Income updated successfull");
	    
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

	getIncomeDataFromServer(){
		var c = this;
		var apiURL = "http://localhost:5000/incomes/getIncomeDataByIdAndUserId";
		var payload = {
			UserId: JSON.parse(localStorage.getItem("user")).UserId,
			id: c.props.location.state.id
		}
		axios.post(apiURL, payload)
	   	.then(function (response) {
	   		console.log(response);
	   		c.setState({id: c.props.location.state.id});
	   		c.setState({amount: response.data[0].amount});
	   		c.setState({label: response.data[0].label});
	   		c.setState({date: response.data[0].date});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<MuiThemeProvider>
					<h1>View Income</h1>

					<h5>ID: {this.state.id}</h5>

					<TextField
						hintText="Enter Amount"
						value={this.state.amount}
						floatingLabelText="Amount"
						onChange = {(event, newValue) => this.setState({amount:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter Label"
						value={this.state.label}
						floatingLabelText="Label"
						onChange = {(event, newValue) => this.setState({label:newValue})}
					/>
					<br/>
					<TextField
						hintText="Enter Date"
						value={this.state.date}
						floatingLabelText="Date"
						onChange = {(event, newValue) => this.setState({date:newValue})}
					/>
					<br/>
			    	<RaisedButton label="Update" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>

			    </MuiThemeProvider>
				<Link to={'/incomes'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ViewIncome;