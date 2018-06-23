import React, { Component } from 'react';
import './App.css';
import LoginArea from './components/LoginArea/LoginArea';
import QuizArea from './components/QuizArea/QuizArea';
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn : true
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
        {(this.state.isLoggedIn) ? <QuizArea /> : <LoginArea login={this.loginUser.bind(this)} />}
      </div>
    );
  }
}

export default App;
