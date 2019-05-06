import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import '../styles/App.css';

class NewIncome extends Component {
	constructor(){
		super();
		this.state = {
			amount: '',
			date: '',
			label: ''
		}
	}

	componentDidMount(){

	}

	handleClick(event){
		var apiURL = "http://localhost:5000/incomes/createNewIncome";
		var self = this;
	    var payload = {
	    	"amount": this.state.amount,
			"date": this.state.date,
			"label": this.state.label,
			"UserId": JSON.parse(localStorage.getItem("user")).UserId,
	    }
	    axios.post(apiURL, payload)
	   	.then(function (response) {
	    	console.log(response);
	     	if(response.data.code == 200){
	      		console.log("Income added successfull");
	    
	     	}
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<h1>New Income</h1>

				<MuiThemeProvider>
		   			<div>
		           		<TextField
		             		hintText="Enter Amount"
		             		floatingLabelText="Amount"
		             		onChange = {(event,newValue) => this.setState({amount:newValue})}

		             	/>
		          	 	<br/>
		           		<TextField
		             		hintText="Enter Date"
		             		floatingLabelText="Date"
		             		onChange = {(event,newValue) => this.setState({date:newValue})}
		             	/>
		           		<br/>
		           		<TextField
		             		hintText="Enter Label"
		             		floatingLabelText="Label"
		             		onChange = {(event,newValue) => this.setState({label:newValue})}
		             	/>
		           		<br/>
		           		<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
		          	</div>
		    	</MuiThemeProvider>


				<Link to={'/income'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default NewIncome;