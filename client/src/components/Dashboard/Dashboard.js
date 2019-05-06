import React, { Component } from 'react';

import '../styles/App.css';

class Dashboard extends Component {
	constructor(){
		super();
		this.state = {
			
		}
	}

	render() {
		return (
			<div className={'safeAreaMargin'}>
				<h1>Dashboard</h1>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Dashboard;