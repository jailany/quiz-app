import React, { Component } from 'react';
import './App.css';
import LoginArea from './components/LoginArea/LoginArea';
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn : false
    }
  }

  loginUser() {
    this.setState({isLoggedIn : true});
  }

  logoutUser() {
    this.setState({isLoggedIn : false});
  }

  render() {
    return (
      <div>
        {(this.state.isLoggedIn) ? 'sdfasdf' : <LoginArea login={this.loginUser.bind(this)} />}
      </div>
    );
  }
}

export default App;
