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

	componentWillMount(){
		var userLoggedIn = localStorage.getItem('user') ? true : false;
		if(userLoggedIn){
			this.props.history.push({
		      pathname: '/expenses'
		    });
		}
	}

	handleClick(event){
		var apiURL = "http://localhost:5000/authentication/createNewUser";
		var self = this;
	    var payload = {
		    "firstName": this.state.firstName,
		    "lastName":this.state.lastName,
		    "email":this.state.email,
		    "password":this.state.password
	    }
	    axios.post(apiURL, payload)
	   	.then(function (response) {
	    	console.log(response);
	     	if(response.data.code == 200){
	      		//  console.log("registration successfull");
	       		var loginscreen = [];
	       		loginscreen.push(<Login parentContext={this}/>);
	       		var loginmessage = "Not Registered yet.Go to registration";
	       		self.props.parentContext.setState(
	       			{
	       				loginscreen:loginscreen,
	       				loginmessage:loginmessage,
	       				buttonLabel:"Register",
	       				isLogin:true
	        		}
	        	);
	     	}
	   	})
	   	.catch(function (error) {
	     	console.log(error);
	   	});
	}

	render(){
		return (
			<div>
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
							             		hintText="Enter your First Name"
							             		floatingLabelText="First Name"
							             		onChange = {(event,newValue) => this.setState({first_name:newValue})}

							             	/>
							          	 	<br/>
							           		<TextField
							             		hintText="Enter your Last Name"
							             		floatingLabelText="Last Name"
							             		onChange = {(event,newValue) => this.setState({last_name:newValue})}
							             	/>
							           		<br/>
							           		<TextField
							             		hintText="Enter your Email"
							             		type="email"
							             		floatingLabelText="Email"
							             		onChange = {(event,newValue) => this.setState({email:newValue})}
							             	/>
							           		<br/>
							           		<TextField
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