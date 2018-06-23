import React, { Component } from 'react';
import './Answer.css';
import Ripples from 'react-ripples'

class Answer extends Component{

    constructor() {
        super();
        this.state = {
            showError : false 
        }
    }

    clickAnswer(questionId, answerId) {
        this.props.answerSelected(questionId, answerId);
        const isValidAnswer = this.props.validateAnswer(answerId);
        if(!isValidAnswer) {
            this.setState({showError : true});
            const _this = this;
            setTimeout(() => {_this.setState({showError : false});}, 400)
        } else {
            this.setState({showError : false});
        }
    }

    render() {
        return (
            <div className={this.state.showError ? 'answerItemBlock errorShake' : 'answerItemBlock'}>
                <Ripples during={3000} color="#FFEB3B">
                    <div onClick={this.clickAnswer.bind(this, this.props.questionId, this.props.id)} 
                    data-question-id={this.props.questionId} data-answer-id={this.props.id} 
                    className={(this.props.isSelected)? 'answerItem selectedAnswer' : 'answerItem'}>
                        {this.props.name}
                    </div>
                </Ripples>
            </div>
        )
    }
}

export default Answer;