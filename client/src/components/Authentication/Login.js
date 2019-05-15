import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}

	componentWillMount(){
		var userLoggedIn = localStorage.getItem('user') ? true : false;
		if(userLoggedIn){
			this.props.history.push({
		      pathname: '/expenses'
		    });
		}
	}

	handleClick(event){
		var apiBaseUrl = "http://localhost:5000/authentication/loginUser";
		var self = this;
		var payload = {
			"email":this.state.username,
			"password":this.state.password
		}
		axios.post(apiBaseUrl, payload)
		.then((response) => {
			console.log(response);
			if(response.status == 200){
				var user_object = {
					email: response.data.email,
					UserId: response.data.UserId
				}
				localStorage.setItem("user", JSON.stringify(user_object));
				this.props.history.push({
			      	pathname: '/expenses'
			    });
			} else if (response.status == 204){
				console.log("Username password do not match");
				alert("Username password do not match");
			}else{
				console.log("Username does not exists");
				alert("Username does not exists");
			}
		})
		.catch((error) => {
			console.log(error);
		});
	}

	render() {
		return (
			<div>
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