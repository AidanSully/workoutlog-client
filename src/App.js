import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/navbar.component";
import Landing from "./components/layout/landing.component";
import Register from "./components/auth/register.component";
import Login from "./components/auth/login.component";

class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<Router>
					<div className='App'>
						<Navbar />
						<Route exact path='/' component={ Landing } />
						<Route exact path='/register' component={ Register } />
						<Route exact path='/login' component={ Login } />

					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;
