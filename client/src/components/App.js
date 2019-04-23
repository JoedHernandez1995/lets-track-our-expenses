import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from '../logo.svg';
import './styles/App.css';

//Components
import ExpenseList from "./Expenses/ExpenseList";
import Dashboard from "./Dashboard/Dashboard";
import Income from "./Income/Income";
import Settings from "./Income/Settings";

import Login from "./Authentication/Login";
import Register from "./Authentication/Register";

import Loginscreen from './AppComponents/LoginScreen';
import Navbar from './AppComponents/Navbar';

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

      console.log(localStorage.getItem('user-token'));
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

            <route path="/expenses/addExpense" component={NewExpense}/>
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

