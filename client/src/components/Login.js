import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from "axios";

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	}

	handleClick(event){
		var apiBaseUrl = "http://localhost:5000/loginUser";
		var self = this;
		var payload = {
			"email":this.state.username,
			"password":this.state.password
		}
		axios.post(apiBaseUrl, payload)
		.then((response) => {
			console.log(response);
			if(response.data.code == 200){
				console.log("Login successfull");
				var uploadScreen = [];
				uploadScreen.push(<UploadScreen appContex={self.props.appContex}/>)
				self.props.appContext.setState({loginPage: [], uploadScreen:uploadScreen})
			} else if (response.data.code == 204){
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
				
				<MuiThemeProvider>
					
					<div>
						
						<AppBar
							title="LTOE Login"
						/>

						<TextField
							hintText="Enter your email"
							floatingLabelText="Email"
							onChange = {(event, newValue) => this.setState({username:newValue})}
						/>

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
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Login;