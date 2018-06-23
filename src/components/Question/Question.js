import React, { Component } from 'react';
import './Question.css';
import Answer from '../Answer/Answer';
import SnackBar from 'react-material-snackbar';

class Question extends Component{
    constructor(){
        super();

        this.state = {
            invalidAnswer : false
        }
    }

    validateAnswer(answerId) {
        if(this.props.data.answer_id === answerId){
            this.setState({invalidAnswer : false});
            return true;
        } else {
            this.setState({invalidAnswer : true});
            return false;
        }
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
                <SnackBar show={this.state.invalidAnswer} timer={2000}>Invalid Answer.</SnackBar>
            </div>
        )
    }
}

export default Question;