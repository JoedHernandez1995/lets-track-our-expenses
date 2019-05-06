import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from '../logo.svg';
import './styles/App.css';

//Components
import Index from "./Index";
import ExpenseList from "./Expenses/ExpenseList";
import NewExpense from "./Expenses/NewExpense";
import ViewExpense from "./Expenses/ViewExpense";

import IncomeList from "./Income/IncomeList";
import NewIncome from "./Income/NewIncome";
import ViewIncome from "./Income/ViewIncome";

import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Settings/Settings";

import Login from "./Authentication/Login";
import Register from "./Authentication/Register";

import Loginscreen from './Authentication/LoginScreen';
import Navbar from './AppComponents/Navbar';
import Sidebar from './AppComponents/Sidebar';

class App extends Component {

  constructor(){
    super();
    this.state = {isLoggedIn: true};
  }

  componentWillMount(){

  }

  render() {

    const isLoggedIn = localStorage.getItem('user') ? true : false;

    let display;

    if (isLoggedIn) {

      display = <div>
        <Sidebar />
      </div>


    } else {

      display = <div>
        <Navbar/>
      </div>

    }
    return (
      <Router>
        <div className="App">
          {display}
          <Switch>
            <Route exact path="/" component={Index}/>
            <Route exact path="/expenses" component={ExpenseList}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/income" component={IncomeList}/>
            <Route exact path="/settings" component={Settings}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route path="/expenses/newExpense" component={NewExpense}/>
            <Route path="/expenses/viewExpense/" component={ViewExpense}/>
            <Route path="/income/newIncome" component={NewIncome} />
            <Route path="/income/viewIncome" component={ViewIncome} />
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

