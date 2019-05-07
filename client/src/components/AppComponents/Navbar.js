import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import '../styles/App.css';

const NavBar = () => {
    			
    return(
        <div>
        	<AppBar className={"topNavbar"} position="static" style={{ display: 'flex'}}>
            	<Toolbar style={{backgroundColor: '#FFFFFF'}}>
            		<Typography className={"titleNormal"} variant="h6">
						Let's Track Our Expenses
					</Typography>
					<div style={{ flex: 1, textAlign: 'right'}}>
            			<Button color="inherit">
            				<Link className={"appLink"} to={'/login'}> Login </Link>
            			</Button>
            			<Button color="inherit">
            				<Link className={"appLink"} to={'/register'}> Register </Link>
            			</Button>
            		</div>
				</Toolbar>
        	</AppBar>

        
        </div>
    );
};

export default NavBar;