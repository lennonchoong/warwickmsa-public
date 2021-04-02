import React, { Component } from 'react';
import './App.css';

// mysql --host=eu-cdbr-west-01.cleardb.com --user=bad0019e44ad2f --password=4bf132aa --reconnect heroku_9676ea096575ad5
class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<form>
						<label for="string">String:</label>
						<input id="string" type="text"></input>
						<input type="submit">Submit</input>
					</form>
				</header>
			</div>
		)
	}
}

export default App;
