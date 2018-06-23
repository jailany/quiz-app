import React, { Component } from 'react';
import './Answer.css';

class Answer extends Component{

    clickAnswer(questionId, answerId) {
        this.props.answerSelected(questionId, answerId);
    }
    render() {
        return (
            <div className="answerItemBlock">
                <div onClick={this.clickAnswer.bind(this, this.props.questionId, this.props.id)} data-question-id={this.props.questionId} data-answer-id={this.props.id} className={(this.props.isSelected)? 'answerItem selectedAnswer' : 'answerItem'}>{this.props.name}</div>
            </div>
        )
    }
}

export default Answer;