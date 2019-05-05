import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import '../styles/App.css';

const NavBar = (props) => {

	var appBarClassName = props.online ? "topNavbarWithMargin" : "topNavbar";

	var titleClassName = props.online ? "titleWhileOnline" : " ";

	let appbar;
	if (props.online){
		appbar = 	<div style={{ flex: 1}}>
            			<Button color="inherit" >
            				<Link to={'/'} onClick={()=>localStorage.clear()}> Logout </Link>
            			</Button>
            		</div>
            			
	}else{
		appbar = 	<div style={{ flex: 1, textAlign: 'right'}}>
            			<Button color="inherit">
            				<Link to={'/login'}> Login </Link>
            			</Button>
            			<Button color="inherit">
            				<Link to={'/register'}> Register </Link>
            			</Button>
            		</div>
            			
	}
    return(
        <div>
        	<AppBar className={appBarClassName} position="static" style={{ display: 'flex'}}>
            	<Toolbar style={{backgroundColor: '#AB0043'}}>
            		<Typography className={titleClassName} variant="h6" color="inherit">
						Let's Track Our Expenses
					</Typography>
					{appbar}
				</Toolbar>
        	</AppBar>

        
        </div>
    );
};

export default NavBar;