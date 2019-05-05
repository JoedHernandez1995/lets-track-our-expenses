import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import '../styles/App.css';




const NavBar = (props) => {

	let appbar;


	if (props.online){
		appbar = 	<AppBar className="topNavbar" position="static">
            			<Toolbar style={{backgroundColor: '#AB0043'}}>
            				<Typography variant="h6" color="inherit">
					            Let's Track Our Expenses
					    	</Typography>
            				<Button color="inherit">
            					Logout
            				</Button>
            			</Toolbar>
        			</AppBar>
	}else{
		appbar = 	<AppBar className="topNavbar" position="static">
            			<Toolbar style={{backgroundColor: '#AB0043'}}>
            				<Typography variant="h6" color="inherit">
					            
					    	</Typography>
            				<Button color="inherit">
            					Login
            				</Button>
            				<Button color="inherit">
            					Register
            				</Button>
            			</Toolbar>
        			</AppBar>
	}
    return(
        <div>
        {appbar}
        </div>
    );
};

export default NavBar;