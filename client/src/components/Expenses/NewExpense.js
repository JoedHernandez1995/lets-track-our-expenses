import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class NewExpense extends Component {
	constructor(props){
		super(props);
		this.state = {
			expenseType:'',
			category:'',
			subcategory:'',
			location:'',
			note:'',
			date:'',
			cost:''
		}
		
	}

	handleClick(event){
		var apiURL = "http://localhost:5000/expenses/createNewExpense";
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
	    }
	    axios.post(apiURL, payload)
	   	.then(function (response) {
	    	console.log(response);
	     	if(response.data.code == 200){
	      		console.log("Expense added successfull");
	    
	     	}
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div>
				<h1>New Expense</h1>

				<MuiThemeProvider>
		   			<div>
		           		<TextField
		             		hintText="Enter Expense Type"
		             		floatingLabelText="Expense Type"
		             		onChange = {(event,newValue) => this.setState({expenseType:newValue})}

		             	/>
		          	 	<br/>
		           		<TextField
		             		hintText="Enter Category"
		             		floatingLabelText="Category"
		             		onChange = {(event,newValue) => this.setState({category:newValue})}
		             	/>
		           		<br/>
		           		<TextField
		             		hintText="Enter Subcategory"
		             		floatingLabelText="Subcategory"
		             		onChange = {(event,newValue) => this.setState({subcategory:newValue})}
		             	/>
		           		<br/>
		           		<TextField
		             		hintText="Enter Location"
		             		floatingLabelText="Location"
		             		onChange = {(event,newValue) => this.setState({location:newValue})}
		             	/>
		           		<br/>
		           		<TextField
		             		hintText="Enter Notes"
		             		floatingLabelText="Notes"
		             		onChange = {(event,newValue) => this.setState({note:newValue})}
		             	/>
		             	<br/>
		           		<TextField
		             		hintText="Enter Date"
		             		floatingLabelText="Date"
		             		onChange = {(event,newValue) => this.setState({date:newValue})}
		             	/>
		             	<br/>
		           		<TextField
		             		hintText="Enter Cost"
		             		floatingLabelText="Cost"
		             		onChange = {(event,newValue) => this.setState({cost:newValue})}
		             	/>
		             	<br/>
		           		<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
		          	</div>
		    	</MuiThemeProvider>


				<Link to={'/expenses'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default NewExpense;