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
		             		onChange = {(event,newValue) => this.setState({notes:newValue})}
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