import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

import Navbar from '../AppComponents/Navbar';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: ""
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
		//var apiBaseUrl = "https://lets-track-our-expenses.herokuapp.com/authentication/loginUser";
		var apiBaseUrl = "http://localhost:5000/authentication/loginUser"
		var self = this;
		var validData = true;
	    //Check for valid data
	    if (this.state.username == ''){
	    	validData = false;
	    }

	    if (this.state.password == ''){
	    	validData = false;
	    }

	    if(validData){

			var payload = {
				"email":this.state.username,
				"password":this.state.password
			}

			axios.post(apiBaseUrl, payload)
			.then((response) => {
				console.log(response);
				if(response.status == 200){
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
			.catch((error) => {
				toast.error("Email or password does not match!");
			});
		}else{
			toast.error("Please fill out all fields before logging in!");
		}
	}

	render() {
		return (
			<div>
				<Navbar />
				<h1>Login</h1>
				<br />
				<Grid container spacing={0}
  					direction="column"
  					alignItems="center"
  					justify="center"
  					style={{ minHeight: '50vh' }}
  				>
					<Card style={{width: '30%', height: '45vh', borderRadius: '25px'}}>
							<CardContent>
								<MuiThemeProvider>
									<div>
										<TextField
											hintText="Enter your email"
											floatingLabelText="Email"
											onChange = {(event, newValue) => this.setState({username:newValue})}
										/>
										<br />
										<TextField
											type="password"
											hintText="Enter your password"
											floatingLabelText="Password"
											onChange = {(event, newValue) => this.setState({password:newValue})}
										/>
										<br/>
										<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
									</div>
								</MuiThemeProvider>
							</CardContent>
					</Card>
				</Grid>
				<ToastContainer autoClose={4000} />
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Login;