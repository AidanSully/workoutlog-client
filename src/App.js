import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser} from './actions/authActions'
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/navbar.component';
import Landing from './components/layout/landing.component';
import Register from './components/auth/register.component';
import Login from './components/auth/login.component';
import PrivateRoute from './components/private-route/privateRoute.component';
import Dashboard from './components/dashboard/dashboard.component';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
	// Set auth token header auth
	const token = localStorage.jwtToken;
	setAuthToken(token);
	// Decode token and get user info and exp
	const decoded = jwt_decode(token);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currenTime = Date.now() / 1000; //to get milliseconds
	if (decoded.exp < currenTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Redirect to login
		window.location.href = './login';
	}
}

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
						<Switch>
							<PrivateRoute exact path='/dashboard' component={Dashboard}/>
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;
