import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './Login';
import Register from './Register';

class Loginscreen extends Component {
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password: '',
			loginscreen: [],
			loginmessage: '',
			buttonLabel: 'Register', 
			isLogin: true
		}
	}

	componentWillMount(){
		
	}
}