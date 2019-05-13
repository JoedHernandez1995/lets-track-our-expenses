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
import axios from 'axios';
import '../styles/App.css';
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
			date:'',
			cost:''
		}
		
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
			<div className={'safeAreaMargin'}>
				<h1>New Expense</h1>

				<Card style={{marginLeft: '20px', marginRight: '20px'}}>
					<CardContent>
						<MuiThemeProvider>
				   			<div>
				   				<Grid container spacing={24}>
				   					<Grid item xs={6} style={{marginTop: '30px', marginLeft: '30px'}}>
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
									            <MenuItem value={'Transport'}>Transport</MenuItem>
									            <MenuItem value={'Clothes'}>Clothes</MenuItem>
									            <MenuItem value={'Fun'}>Fun</MenuItem>
									            <MenuItem value={'Miscellaneous'}>Miscellaneous</MenuItem>
								          	</Select>
							          	</FormControl>
							          	<TextField
						             		hintText="Enter Subcategory"
						             		floatingLabelText="Subcategory"
						             		onChange = {(event,newValue) => this.setState({subcategory:newValue})}
						             		style={{width: '100%', marginTop: '30px'}}
						             	/>
						           		<br/>
						           		<TextField
						             		hintText="Enter Label"
						             		floatingLabelText="Label"
						             		onChange = {(event,newValue) => this.setState({location:newValue})}
						             		style={{width: '100%', marginTop: '30px'}}
						             	/>
							        </Grid>
							        <Grid item xs={6}>
							          
							        </Grid>

								</Grid>
				           		
				           		
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
					</CardContent>
				</Card>


				<Link to={'/expenses'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default NewExpense;