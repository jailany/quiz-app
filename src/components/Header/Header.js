import React, { Component } from 'react';
import './Header.css';

class Header extends Component{

    render() {
        return (
            <header>
                <div className="logo">Quiz-App</div>
                <div className="logoutArea">
                    <button className="logoutButton">Logout</button>
                </div>
            </header>
        )
    }
}

export default Header;