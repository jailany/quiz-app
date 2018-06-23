import React, { Component } from 'react';
import './QuizArea.css';
import Header from '../Header/Header';
import QuizBox from '../QuizBox/QuizBox';

class QuizArea extends Component{

    render() {
        return (
            <div className="quizArea">
                <Header/>
                <QuizBox />
            </div>
        )
    }
}

export default QuizArea;