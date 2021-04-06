import React, { Component } from 'react';
import Dashboard from './dashboard/Dashboard';
import Login from "./dashboard/Login";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            auth: false,
        }
        this.authLogin = this.authLogin.bind(this);
        this.logout = this.logout.bind(this);
    }

    authLogin(state) {
        this.setState({auth: state});
    }

    logout() {
        this.setState({auth: false});
    }

    render() {
        let block;
        if (this.state.auth) {
            block = <Dashboard logout={this.logout}/>
        } else {
            block = <Login authLogin={this.authLogin}/>
        }

        return (
            <div>
                {block}
            </div>
        )
    }
}

export default Admin