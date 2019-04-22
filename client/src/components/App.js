import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from '../logo.svg';
import './styles/App.css';

//Components
import ExpenseList from "./ExpenseList";
import Dashboard from "./Dashboard";
import Income from "./Income";
import Settings from "./Settings";

import Login from "./Login";
import Register from "./Register";

import Loginscreen from './LoginScreen';
import Navbar from './Navbar';

class App extends Component {

  constructor(){
    super();
    this.state = {isLoggedIn: true};
  }

  componentWillMount(){

  }


  render() {

    const isLoggedIn = localStorage.getItem('user-token') ? true : false;

    let route_list;

    if (isLoggedIn) {
      route_list = <div>
        
            <Link to={'/expenses'}> Expenses </Link>
            <Link to={'/dashboard'}> Dashboard </Link>
            <Link to={'/income'}> Income </Link>
            <Link to={'/settings'}> Settings </Link>
      </div>

    } else {
      route_list = <div> 
            <Link to={'/login'}> Login </Link>
            <Link to={'/register'}> Register </Link>
      </div>
    }
    return (
      <Router>
        <div className="App">
          <Navbar />

          {route_list}

          <Switch>
            <Route exact path="/expenses" component={ExpenseList}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/income" component={Income}/>
            <Route exact path="/settings" component={Settings}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </Switch>
        </div>

        

      </Router>
      
    );
  }
}

const style = {
  margin: 15,
};


export default App;

