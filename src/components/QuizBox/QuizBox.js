import React, { Component } from 'react';
import './QuizBox.css';
import Timer from '../Timer/Timer';
import Question from '../Question/Question';
import SnackBar from 'react-material-snackbar';

class QuizBox extends Component{

    constructor(){
        super();

        this.state = {
            "questions" : [
                {
                    "id" : 1,
                    "text" : "What does Jarvis stand for?",
                    "answer_id" : 11,
                    "answers" : [
                        {
                            "id" : 10,
                            "text" : "It's the name of Tony's best childhood friend"
                        },
                        {
                            "id" : 11,
                            "text" : "Just a Rather Very Intelligent System"
                        },
                        {
                            "id" : 12,
                            "text" : "Nobody knows"
                        },
                        {
                            "id" : 13,
                            "text" : "It's an anagram"
                        }
                    ]
                },
                {
                    "id" : 2,
                    "text" : "What were the names of Bruce Wayne's parents?",
                    "answer_id" : 17,
                    "answers" : [
                        {
                            "id" : 14,
                            "text" : "James & Elizabeth"
                        },
                        {
                            "id" : 15,
                            "text" : "Wayne & Alice"
                        },
                        {
                            "id" : 16,
                            "text" : "George & Elaine"
                        },
                        {
                            "id" : 17,
                            "text" : "Thomas & Martha"
                        }
                    ]
                },
                {
                    "id" : 3,
                    "text" : "In Avengers - Infinity Wars, Whom did Thanos sacrifice to get the Soul Stone?",
                    "answer_id" : 18,
                    "answers" : [
                        {
                            "id" : 18,
                            "text" : "Gamora"
                        },
                        {
                            "id" : 19,
                            "text" : "Ebony Maw"
                        },
                        {
                            "id" : 20,
                            "text" : "Nebula"
                        },
                        {
                            "id" : 21,
                            "text" : "Proxima Midnight"
                        }
                    ]
                }
            ],
            currentQuestion : 1,
            userAnswers : [],
            requiredError : false
        };

        console.log(this.state);
    }

    nextQuestion() {
        if(this.state.currentQuestion < 3){
            if(this.checkIfAnswered()){
                this.setState({currentQuestion : this.state.currentQuestion+1});
                this.setState({requiredError : false});
            } else {
                this.setState({requiredError : true});
            }
        }
    }

    previousQuestion() {
        if(this.state.currentQuestion > 1){
            this.setState({currentQuestion : this.state.currentQuestion-1});
        }
    }

    answerSelected(questionId, answerId) {
        this.setState({requiredError : false});
        const tempArray  = [...this.state.userAnswers];
        tempArray[questionId-1] = answerId;
        this.setState({userAnswers : tempArray});
    }

    checkIfAnswered() {
        return (this.state.userAnswers[this.state.currentQuestion-1]);
    }

    render() {
        return (
           <div className="quizBox shadow flex flexColumn">
                <div className="flexGrow1 rightContent">
                    <Timer />
                </div>

                <div className="flexGrow4 flex flexColumnCenter">
                    <Question selected={this.state.userAnswers[this.state.currentQuestion-1]} answerSelected={this.answerSelected.bind(this)} data={this.state.questions[this.state.currentQuestion-1]} />
                </div>

                <div className="flexGrow1 rightContent">
                    {(this.state.currentQuestion > 1) ? <a className="nextButton" onClick={this.previousQuestion.bind(this)}>Previous</a> : ''}
                    {(this.state.currentQuestion < 3) ? <a className="nextButton" onClick={this.nextQuestion.bind(this)}>Next</a> : ''}
                    {(this.state.currentQuestion === 3) ? <a className="nextButton" >Submit</a> : ''}
                </div>

                <SnackBar show={this.state.requiredError} timer={3000}>Please answer the current question to continue.</SnackBar>
           </div>
        )
    }
}

export default QuizBox;