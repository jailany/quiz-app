import React, { Component } from 'react';
import './Header.css';

class Header extends Component{

    logoutUser(){
        this.props.logout();
    }

    render() {
        return (
            <header>
                <div className="logo">Quiz-App</div>
                <div className="logoutArea">
                    <button className="logoutButton" onClick={this.logoutUser.bind(this)}>Logout</button>
                </div>
            </header>
        )
    }
}

export default Header;