import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from '../AppComponents/Sidebar';
import Button from '@material-ui/core/Button';

import '../styles/App.css';

const incomeTypes = ["Active","Passive","Portfolio"];
const passiveIncomeCategories = ["Real Estate","Peer-to-Peer Lending","Index Funds","Dividend Stock"];
const activeIncomeCategories = ["Salary","Business Profit","Wages","Commissions","Bonus"];
const portfolioIncomeCategories = ["Investments","Dividends","Interests","Capital Gains"];

var date = new Date();
var year = date.getFullYear();
var month = ((date.getMonth()) + 1).toString();
var day = (date.getDate()).toString();
var today = month + "/" + day + "/" + year;

class ViewIncome extends Component {

	constructor(){
		super();
		this.state = {
			id: 0,
			amount: 0.0,
			label: '',
			date: '',
			incomeType: 'Active',
			incomeTypeCategory: 'Salary',
			incomeTypeCategories: ["Salary","Business Profit","Wages","Commissions","Bonus"]
		}
	}

	parseDate(date){
		var date = new Date(date);
		var year = date.getFullYear();
		var month = ((date.getMonth()) + 1).toString();
		month = month.length > 1 ? month : "0" + month;
		var day = (date.getDate()).toString();
		day = day.length > 1 ? day : "0" + day;
		return month + "/" + day + "/" + year;
	}

	handleDateChange = (date: any) => {
		this.setState({date:this.parseDate(date)});
	}

	handleExpenseTypeChange = (event) => {
		console.log(event);
		this.setState({incomeType: event.target.value})
		if(event.target.value == "Active"){
			this.setState({incomeTypeCategories: activeIncomeCategories});
			this.setState({incomeTypeCategory: 'Salary'}) //Always put the first option of the income type
		}else if(event.target.value == "Passive"){
			this.setState({incomeTypeCategories: passiveIncomeCategories});
			this.setState({incomeTypeCategory: 'Real Estate'}) //Always put the first option of the income type
		}else{
			this.setState({incomeTypeCategories: portfolioIncomeCategories});
			this.setState({incomeTypeCategory: 'Investments'}) //Always put the first option of the income type
		}
		
	}

	deleteIncome = (event) => {
		var c = this;
		event.preventDefault();
		var apiURL = "https://lets-track-our-expenses.herokuapp.com/incomes/deleteIncomeByIncomeId";
		//var apiURL = "http://localhost:5000/incomes/deleteIncomeByIncomeId";
		axios.post(apiURL, {id: this.state.id})
		.then(function (response) {
		    if(response.status == 200){
		    	c.props.history.push({
			    	pathname: '/income'
			    });
		    }
		})
		.catch(function (error) {
			console.log(error);
		});	
	}

	handleClick(){
		var apiURL = "https://lets-track-our-expenses.herokuapp.com/incomes/updateIncomeByIncomeId";
		//var apiURL = "http://localhost:5000/incomes/updateIncomeByIncomeId";
		var self = this;
		var validData = true;
	     //Check for valid data
	    if (this.state.amount == ''){
	    	validData = false;
	    }

	    if (this.state.label == ''){
	    	validData = false;
	    }

	    if (validData){
	    	var payload = {
		    	"amount": this.state.amount,
				"label": this.state.label,
				"date": this.state.date,
				"UserId": JSON.parse(localStorage.getItem("user")).UserId,
				"id": this.props.location.state.id,
				"incomeType": this.state.incomeType,
				"incomeTypeCategory": this.state.incomeTypeCategory,		    }
		    axios.post(apiURL, payload)
		   	.then(function (response) {
		    	console.log(response);
		     	if(response.status == 200){
		      		toast.success("Income has been updated!", {
				        position: toast.POSITION.TOP_RIGHT
				    });	
		     	}
		   	})
		   	.catch(function (error) {
		     	console.log(error);
		   	});
		}
	}

	componentDidMount(){
		this.setState({id: this.props.location.state.id});
		this.getIncomeDataFromServer();
	}

	getIncomeDataFromServer(){
		var c = this;
		var apiURL = "https://lets-track-our-expenses.herokuapp.com/incomes/getIncomeDataByIdAndUserId";
		//var apiURL = "http://localhost:5000/incomes/getIncomeDataByIdAndUserId";
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
	   		c.setState({incomeType: response.data[0].incomeType});

	   		if(response.data[0].incomeType == "Active"){
				c.setState({incomeTypeCategories: activeIncomeCategories});
				//this.setState({incomeTypeCategory: 'Salary'}) //Always put the first option of the income type
			}else if(response.data[0].incomeType == "Passive"){
				c.setState({incomeTypeCategories: passiveIncomeCategories});
				//this.setState({incomeTypeCategory: 'Real Estate'}) //Always put the first option of the income type
			}else{
				c.setState({incomeTypeCategories: portfolioIncomeCategories});
				//this.setState({incomeTypeCategory: 'Investments'}) //Always put the first option of the income type
			}

	   		c.setState({incomeTypeCategory: response.data[0].incomeTypeCategory});
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<Sidebar />
				<h1>Income Data for: {this.state.label}</h1>
				<Card style={{marginLeft: '20px', marginRight: '20px'}}>
					<CardContent>
						<MuiThemeProvider>
				   			<div>
				   				<Grid container spacing={24}>
				   					<Grid item xs={6} style={{marginTop: '30px'}}>
				   						<FormControl className={"selectBox"} variant="outlined" >
					   						<InputLabel
								            	ref={ref => {
								              	this.InputLabelRef = ref;
								            	}}
								           	 	htmlFor="outlined-income-type"
								          	>
								            Income Type
								          	</InputLabel>
								          	<Select
								            	value={this.state.incomeType}
								            	onChange={this.handleExpenseTypeChange}
								            	input={
								              		<OutlinedInput
								                		labelWidth={this.state.labelWidth}
								                		name="income-type"
								                		id="outlined-income-type"
								              		/>
								            	}
								            	styles={{minWidth: '300px'}}
								          	>
								          	{incomeTypes.map((income,index) => {
												return <MenuItem value={income}>{income}</MenuItem>
												
											})}
								          	</Select>
							          	</FormControl>
							          	<FormControl className={"selectBox"} variant="outlined" style={{marginTop: '40px'}}>
					   						<InputLabel
								            	ref={ref => {
								              	this.InputLabelRef = ref;
								            	}}
								           	 	htmlFor="income-type-category"
								          	>
								            Income Type Category
								          	</InputLabel>
								          	<Select
								            	value={this.state.incomeTypeCategory}
								            	onChange={this.handleIncomeTypeCategoryChange}
								            	input={
								              		<OutlinedInput
								                		labelWidth={this.state.labelWidth}
								                		name="income-type-category"
								                		id="outlined-category"
								              		/>
								            	}
								            	styles={{minWidth: '300px'}}
								          	>
									    	{this.state.incomeTypeCategories.map((incomeType,index) => {
												return <MenuItem value={incomeType}>{incomeType}</MenuItem>
												
											})}
								          	</Select>
							          	</FormControl>
							          	<TextField
							          		value={this.state.label}
						             		floatingLabelText="Label"
						             		onChange = {(event,newValue) => this.setState({label:newValue})}
						             		style={{width: '100%', marginTop: '30px'}}
						             	/>
						             	<br />
						             	<br />
						             	<br />
						             	<br />
						             	<Link to={'/income'} style={{float: 'left'}}> Back </Link>
							        </Grid>
							        <Grid item xs={6}>
							        	<TextField
							        		value={this.state.amount}
						           			type="number"
						             		floatingLabelText="Amount"
						             		onChange = {(event,newValue) => this.setState({amount:newValue})}
						             		style={{width: '100%', marginTop: '25px'}}
						             	/>
						             	<br/>
						             	<MuiPickersUtilsProvider utils={DateFnsUtils}>
							             	<DatePicker
												margin="normal"
											   	label="Date"
											   	format="MM/dd/yyyy"
											    value={this.state.date}
											    onChange={this.handleDateChange}
											    style={{width: '100%', marginTop: '30px'}}
											/>
										</MuiPickersUtilsProvider>
						             	<br/>
						             	<br />
						             	<br />
						             	<br />
										<RaisedButton label="Update" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
										<Button variant="contained" style={{backgroundColor: '#D82B2B', color: "white"}} onClick={(event) => this.deleteIncome(event)}>
											Delete Income
										</Button>							        
									</Grid>
								</Grid>
				          	</div>
				    	</MuiThemeProvider>
					</CardContent>
				</Card>
				<ToastContainer autoClose={4000} />
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default ViewIncome;