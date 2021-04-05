import React, { Component } from 'react';
import './App.css';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2'

class Main extends Component {
	constructor() {
		super();
		this.page2Ref = React.createRef();
	}


    render() {
        return (
            <div className="App">
				<Page1 nextPageRef={this.page2Ref}/>
				<Page2 ref={this.page2Ref}/>
			</div>
        )
    }
}

export default Main