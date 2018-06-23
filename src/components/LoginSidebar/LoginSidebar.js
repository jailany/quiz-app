import React, { Component } from 'react';
import './LoginSidebar.css';
import SnackBar from 'react-material-snackbar';

class LoginSidebar extends Component{

    constructor() {
        super();
        this.state = {
            username : '',
            password : '',
            loginSnackBar : false,
            loginSnackMessage : ''
        }
    }

    updateUsername(e) {
        this.setState({username: e.target.value});
    }

    updatePassword(e) {
        this.setState({password: e.target.value});
    }

    loginUser(e) {
        const _this = this;
        
        this.setState({loginSnackBar : true, loginSnackMessage: 'Logging in..'});

        if (this.state.username === 'jai' && this.state.password === 'pass') {
            _this.timeout = setTimeout(() => {
                this.setState({loginSnackBar : false, loginSnackMessage: ''});
                _this.props.login();
            }, 3000);
        } else {
            this.setState({loginSnackBar : true, loginSnackMessage: 'Invalid Username and Password'});
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            <div className="LoginSidebar">
                <div className="LoginForm">
                    <div>
                        <input type="text" className="inputField userName" onChange={this.updateUsername.bind(this)} name="username" placeholder="enter username" />
                    </div>
                    <div>
                        <input type="password" className="inputField password" onChange={this.updatePassword.bind(this)} name="password" placeholder="enter password" />
                    </div>
                    <div>
                        <button type="submit" className="button submitButton" value="Login" onClick={this.loginUser.bind(this)}>Login</button>
                    </div>
                </div>
                <SnackBar show={this.state.loginSnackBar} timer={2000}>{this.state.loginSnackMessage}</SnackBar>
            </div>
        )
    };
}

export default LoginSidebar;