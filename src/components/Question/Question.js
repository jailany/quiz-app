import React, { Component } from 'react';
import './Question.css';
import Answer from '../Answer/Answer';

class Question extends Component{

    
    render() {
        const currentProps = this.props;
        const answersItems = currentProps.data.answers.map((answer) => 
            <Answer isSelected={(currentProps.selected === answer.id) ? true : false} key={answer.id} id={answer.id} questionId={currentProps.data.id} answerSelected={currentProps.answerSelected} name={answer.text} />    
        );

        return (
            <div className="questionItem">
                <h4 className="questionText">{this.props.data.text}</h4>
                <div className="answersContainer">
                    {answersItems}
                </div>
            </div>
        )
    }
}

export default Question;