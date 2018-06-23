import React, { Component } from 'react';
import './Question.css';
import Answer from '../Answer/Answer';
import SnackBar from 'react-material-snackbar';

class Question extends Component{
    constructor(){
        super();

        this.state = {
            invalidAnswer : false,
            errorText : ''
        }
    }

    validateAnswer(answerId) {
        if(this.props.data.answer_id === answerId){
            this.setState({invalidAnswer : true, errorText : 'Answer is correct.'});
            this.timeoutForSnack();
            return true;
        } else {
            this.setState({invalidAnswer : true, errorText : 'Answer is Incorrect.'});
            this.timeoutForSnack();
            return false;
        }
        
    }

    timeoutForSnack() {
        const _this = this;
        _this.timeout = setTimeout(() => {
            this.setState({invalidAnswer : false, errorText : ''});
        }, 1500);
    }

    stopTimeout() {
        clearTimeout(this.timeout);
    }

    componentWillUnmount() {
        this.stopTimeout();
    }

    render() {
        const currentProps = this.props;
        const answersItems = currentProps.data.answers.map((answer) => 
            <Answer isSelected={(currentProps.selected === answer.id) ? true : false} key={answer.id} 
            id={answer.id} questionId={currentProps.data.id} answerSelected={currentProps.answerSelected} 
            name={answer.text} validateAnswer={this.validateAnswer.bind(this)}/>    
        );

        return (
            <div className="questionItem">
                <h4 className="questionText">{this.props.data.text}</h4>
                <div className="answersContainer">
                    {answersItems}
                </div>
                <SnackBar show={this.state.invalidAnswer} timer={1500}>{this.state.errorText}</SnackBar>
            </div>
        )
    }
}

export default Question;