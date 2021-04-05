import React, { Component } from 'react';
import Main from "./Main";
import Admin from "./Admin";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import './App.css';

// mysql --host=eu-cdbr-west-01.cleardb.com --user=bad0019e44ad2f --password=4bf132aa --reconnect heroku_9676ea096575ad5
class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<Main />
					</Route>
					<Route path="/admin">
						<Admin />
					</Route>
				</Switch>
			</Router>
		)
	}
}

export default App;
