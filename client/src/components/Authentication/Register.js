import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import Login from '../Authentication/Login';
import Navbar from '../AppComponents/Navbar';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstName:'',
			lastName:'',
			email:'',
			password:''
		}
		
	}

	componentDidMount(){
		var userLoggedIn = localStorage.getItem('user') ? true : false;
		if(userLoggedIn){
			this.props.history.push({
		      pathname: '/expenses'
		    });
		}
	}

	handleClick(event){
		var apiURL = "https://lets-track-our-expenses.herokuapp.com/authentication/createNewUser";
		//var apiURL = "http://localhost:5000/authentication/createNewUser";

		var self = this;
		var validData = true;
	    //Check for valid data
	    if (this.state.firstName == ''){
	    	validData = false;
	    }

	    if (this.state.lastName == ''){
	    	validData = false;
	    }

	    if (this.state.email == ''){
	    	validData = false;
	    }

	    if (this.state.password == ''){
	    	validData = false;
	    }

	    if (validData){
		    var payload = {
			    "firstName": this.state.firstName,
			    "lastName":this.state.lastName,
			    "email":this.state.email,
			    "password":this.state.password
		    }
		    axios.post(apiURL, payload)
		   	.then(function (response) {
		    	console.log(response);
		     	if(response.status == 200){
		     		toast.success("Registration Successfull!");
		     		console.log("What is self");
		     		console.log(self);
		     		var user_object = {
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						email: response.data.email,
						UserId: response.data.UserId
					}
					localStorage.setItem("user", JSON.stringify(user_object));
					self.props.history.push({
				      	pathname: '/expenses'
				    });
		     	}
		   	})
		   	.catch(function (error) {
		   		toast.error("User with the same email already exists!");
		     	console.log(error);
		   	});
		}else{
			toast.error("Please fill out all information for registering!");
		}
	}

	render(){
		return (
			<div>
				<Navbar />
				<h1>Register</h1>
					<br />
					<Grid container spacing={0}
	  					direction="column"
	  					alignItems="center"
	  					justify="center"
	  					style={{ minHeight: '50vh' }}
	  				>
						<Card style={{width: '30%', height: '60vh', borderRadius: '25px'}}>
								<CardContent>
									<MuiThemeProvider>
										<div>
											<TextField
												value={this.state.firstName}
							             		hintText="Enter your First Name"
							             		floatingLabelText="First Name"
							             		onChange = {(event,newValue) => this.setState({firstName:newValue})}

							             	/>
							          	 	<br/>
							           		<TextField
							           			value={this.state.lastName}
							             		hintText="Enter your Last Name"
							             		floatingLabelText="Last Name"
							             		onChange = {(event,newValue) => this.setState({lastName:newValue})}
							             	/>
							           		<br/>
							           		<TextField
							           			value={this.state.email}
							             		hintText="Enter your Email"
							             		type="email"
							             		floatingLabelText="Email"
							             		onChange = {(event,newValue) => this.setState({email:newValue})}
							             	/>
							           		<br/>
							           		<TextField
							           			value={this.state.password}
							             		type = "password"
							             		hintText="Enter your Password"
							             		floatingLabelText="Password"
							             		onChange = {(event,newValue) => this.setState({password:newValue})}
							             	/>
							           		<br/>
							           		<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
										</div>
									</MuiThemeProvider>
								</CardContent>
						</Card>
					</Grid>
					<ToastContainer autoClose={4000} />
			</div>
		)
	}
}

const style = {
  margin: 15,
};

export default Register;