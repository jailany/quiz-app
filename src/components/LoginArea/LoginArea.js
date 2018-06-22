import React, { Component } from 'react';
import './LoginArea.css';
import HeroImage from '../HeroImage/HeroImage';
import LoginSidebar from '../LoginSidebar/LoginSidebar';

class LoginArea extends Component {
    render() {
        return (
            <div>
                <HeroImage />
                <LoginSidebar login={this.props.login} />
            </div>
        )
    }
}

export default LoginArea;