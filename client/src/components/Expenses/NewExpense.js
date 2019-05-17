import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
import Sidebar from '../AppComponents/Sidebar';

var date = new Date();
var year = date.getFullYear();
var month = ((date.getMonth()) + 1).toString();
var day = (date.getDate()).toString();
var today = month + "/" + day + "/" + year;


class NewExpense extends Component {
	constructor(props){
		super(props);
		this.state = {
			labelWidth: 0,
			expenseType:'Personal',
			category: 'General',
			subcategory:'',
			location:'',
			note:'',
			date: today,
			cost:''
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

	handleExpenseTypeChange = (event) => {
		console.log(event);
		this.setState({expenseType: event.target.value})
	}

	handleCategoryChange = (event) => {
		this.setState({category: event.target.value})
	}

	handleDateChange = (date: any) => {
		this.setState({date:this.parseDate(date)});
	}

	handleClick = (event) => {
		//var apiURL = "https://lets-track-our-expenses.herokuapp.com/expenses/createNewExpense";
	    var apiURL = "http://localhost:5000/expenses/createNewExpense";

	    var validData = true;
	    var self = this;
	    //Check for valid data
	    if (this.state.subcategory == ''){
	    	validData = false;
	    }

	    if (this.state.location == ''){
	    	validData = false;
	    }

	    if (this.state.cost == ''){
	    	validData = false;
	    }

	    if (this.state.notes == ''){
	    	validData = false;
	    }

	    if (validData){
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
		     	if(response.status == 200){
		      		toast.success("Expense has been added successfully!");
		      		self.setState({expenseType: 'Personal'});
		      		self.setState({category: 'General'});
		      		self.setState({subcategory: ''});
		      		self.setState({location: ''});
		      		self.setState({note: ''});
		      		self.setState({date: today});
		      		self.setState({cost: ''});
		     	}
		   	})
		   	.catch(function (error) {
		     	console.log(error);
		   	});	
	    }else{
	    	toast.error("Please fill out all the expense information!");
	    }
	    
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<Sidebar />
				<h1>New Expense</h1>

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
								           	 	htmlFor="outlined-expense-type"
								          	>
								            Expense Type
								          	</InputLabel>
								          	<Select
								            	value={this.state.expenseType}
								            	onChange={this.handleExpenseTypeChange}
								            	input={
								              		<OutlinedInput
								                		labelWidth={this.state.labelWidth}
								                		name="expense-type"
								                		id="outlined-expense-type"
								              		/>
								            	}
								            	styles={{minWidth: '300px'}}
								          	>
									            <MenuItem value={'Personal'}>Personal</MenuItem>
									            <MenuItem value={'Social'}>Social</MenuItem>
									            <MenuItem value={'Work'}>Work</MenuItem>
									            <MenuItem value={'Family'}>Family</MenuItem>
								          	</Select>
							          	</FormControl>
							          	<FormControl className={"selectBox"} variant="outlined" style={{marginTop: '40px'}}>
					   						<InputLabel
								            	ref={ref => {
								              	this.InputLabelRef = ref;
								            	}}
								           	 	htmlFor="outlined-category"
								          	>
								            Category
								          	</InputLabel>
								          	<Select
								            	value={this.state.category}
								            	onChange={this.handleCategoryChange}
								            	input={
								              		<OutlinedInput
								                		labelWidth={this.state.labelWidth}
								                		name="expense-category"
								                		id="outlined-category"
								              		/>
								            	}
								            	styles={{minWidth: '300px'}}
								          	>
									            <MenuItem value={'General'}>General</MenuItem>
									            <MenuItem value={'Personal'}>Personal</MenuItem>
									            <MenuItem value={'House'}>House</MenuItem>
									            <MenuItem value={'Food-Drinks'}>Food & Drinks</MenuItem>
									            <MenuItem value={'Transport'}>Transport</MenuItem>
									            <MenuItem value={'Clothes'}>Clothes</MenuItem>
									            <MenuItem value={'Fun'}>Fun</MenuItem>
									            <MenuItem value={'Miscellaneous'}>Miscellaneous</MenuItem>
								          	</Select>
							          	</FormControl>
							          	<TextField
							          		value={this.state.subcategory}
						             		floatingLabelText="Subcategory"
						             		onChange = {(event,newValue) => this.setState({subcategory:newValue})}
						             		style={{width: '100%', marginTop: '30px'}}
						             	/>
						           		<br/>
						           		<TextField
						           			value={this.state.location}
						             		floatingLabelText="Label"
						             		onChange = {(event,newValue) => this.setState({location:newValue})}
						             		style={{width: '100%', marginTop: '30px'}}
						             	/>
						             	<br />
						             	<br />
						             	<Link to={'/expenses'} style={{float: 'left'}}> Back </Link>
							        </Grid>
							        <Grid item xs={6}>
							        	<TextField
							        		value={this.state.cost}
						           			type="number"
						             		floatingLabelText="Cost"
						             		onChange = {(event,newValue) => this.setState({cost:newValue})}
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
						           		<TextField
						           			value={this.state.note}
						             		floatingLabelText="Notes"
						             		onChange = {(event,newValue) => this.setState({note:newValue})}
						             		style={{width: '100%', marginTop: '30px'}}
						             	/>
						             	<br/>
						           		<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
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

export default NewExpense;