import React, { Component } from 'react';

class Income extends Component {
	constructor(){
		super();
		this.state = {
			
		}
	}

	render() {
		return (
			<div>
				<h1>New Income</h1>
				<Link to={'/income'}> Back </Link>
			</div>
		);
	}
}

const style = {
	margin: 15,
}

export default Income;