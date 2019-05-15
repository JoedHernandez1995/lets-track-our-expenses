import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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

class NewIncome extends Component {
	constructor(){
		super();
		this.state = {
			labelWidth: 0,
			amount: '',
			date: today,
			label: '',
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

	componentDidMount(){
		this.setState({
	    	labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
	    });
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

	handleIncomeTypeCategoryChange = (event) => {
		this.setState({incomeTypeCategory: event.target.value})
	}

	handleClick(event){
		var apiURL = "http://localhost:5000/incomes/createNewIncome";
		var validData = true;
	    var self = this;

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
				"date": this.state.date,
				"label": this.state.label,
				"incomeType": this.state.incomeType,
				"incomeTypeCategory": this.state.incomeTypeCategory,
				"UserId": JSON.parse(localStorage.getItem("user")).UserId,
		    }
		    axios.post(apiURL, payload)
		   	.then(function (response) {
		     	if(response.status == 200){
		      		toast.success("Income source has been added successfully!");
		      		self.setState({incomeType: 'Active'});
		      		self.setState({incomeTypeCategory: 'Salary'});
		      		self.setState({incomeTypeCategories: ["Salary","Business Profit","Wages","Commissions","Bonus"]});
		      		self.setState({label: ''});
		      		self.setState({amount: ''});
		      		self.setState({date: today});
		    
		     	}
		   	})
		   	.catch(function (error) {
		     	toast.error("Please fill out all the expense information!");
		   	});
		}
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<h1>New Income</h1>
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
										<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>							        </Grid>
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

export default NewIncome;