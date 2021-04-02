import React, { Component } from 'react';
import './App.css';

// mysql --host=eu-cdbr-west-01.cleardb.com --user=bad0019e44ad2f --password=4bf132aa --reconnect heroku_9676ea096575ad5
class App extends Component {
	constructor() {
		super()
		this.state = {
			data: ""
		}
	}

	handleChange = (e) => {
		const data = e.target.value;
		this.setState({'data': data}, () => console.log(this.state));
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(JSON.stringify(this.state));
		fetch("/api/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
			.then((response) => response.json())
			.then(() => {
				console.log("Success:", this.state.data);
				alert("success");
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<form onSubmit={this.handleSubmit}>
						<label for="string">String:</label>
						<input id="string" name='string' type="text" onChange={this.handleChange}/>
						<input type="submit" value="Submit"/>
					</form>
				</header>
			</div>
		)
	}
}

export default App;
