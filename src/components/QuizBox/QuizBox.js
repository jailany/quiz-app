import React, { Component } from 'react';
import './QuizBox.css';
import Timer from '../Timer/Timer';
import Question from '../Question/Question';
import SnackBar from 'react-material-snackbar';

class QuizBox extends Component{

    constructor(){
        super();

        this.state = {
            "questions":[{"id":1,"text":"What does Jarvis stand for?","answer_id":11,"answers":[{"id":10,"text":"It's the name of Tony's best childhood friend"},{"id":11,"text":"Just a Rather Very Intelligent System"},{"id":12,"text":"Nobody knows"},{"id":13,"text":"It's an anagram"}]},{"id":2,"text":"What were the names of Bruce Wayne's parents?","answer_id":17,"answers":[{"id":14,"text":"James & Elizabeth"},{"id":15,"text":"Wayne & Alice"},{"id":16,"text":"George & Elaine"},{"id":17,"text":"Thomas & Martha"}]},{"id":3,"text":"In Avengers - Infinity Wars, Whom did Thanos sacrifice to get the Soul Stone?","answer_id":18,"answers":[{"id":18,"text":"Gamora"},{"id":19,"text":"Ebony Maw"},{"id":20,"text":"Nebula"},{"id":21,"text":"Proxima Midnight"}]}],
            currentQuestion : 1,
            userAnswers : [],
            requiredError : false,
            isTestComplete : false,
            correctAnswers : 0,
            processedResults : []
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

    completeTest(){
        console.log("test complete");
        this.processAnswers();
    }

    processAnswers() {
        const questions = [...this.state.questions];
        const givenAnswers = [...this.state.userAnswers];
        const result = [];
        const _this = this;
        let counter = _this.state.correctAnswers;

        questions.map((question) => {
            const data = {
                "question_text" : question.text,
                "acutal_answer" : _this.getAnswerById(question, question.answer_id),
                "given_answer" : _this.getAnswerById(question, givenAnswers[question.id-1] ),
                "isCorrect" : (question.answer_id === givenAnswers[question.id-1])
            }
            if(question.answer_id === givenAnswers[question.id-1]){
                counter = counter+1;
            }
                 

            result.push(data);
        });
        console.log(result);
        _this.setState({processedResults : result, isTestComplete : true, correctAnswers: counter});
    }

    getAnswerById(question, id){
        let text = '';
        question.answers.map((answer) => {
            if(answer.id === id){
                text = answer.text
            }
        });

        return text;
    }

    
    render() {

        const resultSet = this.state.processedResults.map((item) => {
            return (
                <div key={item.question_text} className="questionResultItem shadow">
                    <h3>{item.question_text}</h3>
                    <p>Correct Answer : {item.acutal_answer}</p>
                    <p className={item.isCorrect ? 'correctAnswer pull-right' : 'wrongAnswer pull-right'}>Given Answer : {item.given_answer ? item.given_answer : 'Not Answered'}</p>
                </div>
            )
        });


        return (
           <div>
               <div className={this.state.isTestComplete ? 'quizBox shadow flex flexColumn hidden' : 'quizBox shadow flex flexColumn '}>
                    <div className="flexGrow1 rightContent">
                        <Timer completeTest={this.completeTest.bind(this)} />
                    </div>

                    <div className="flexGrow4 flex flexColumnCenter">
                        <Question selected={this.state.userAnswers[this.state.currentQuestion-1]} answerSelected={this.answerSelected.bind(this)} data={this.state.questions[this.state.currentQuestion-1]} />
                    </div>

                    <div className="flexGrow1 rightContent">
                        {(this.state.currentQuestion > 1) ? <a className="nextButton" onClick={this.previousQuestion.bind(this)}>Previous</a> : ''}
                        {(this.state.currentQuestion < 3) ? <a className="nextButton" onClick={this.nextQuestion.bind(this)}>Next</a> : ''}
                        {(this.state.currentQuestion === 3) ? <a className="nextButton" onClick={this.completeTest.bind(this)}>Submit</a> : ''}
                    </div>

                    <SnackBar show={this.state.requiredError} timer={3000}>Please answer the current question to continue.</SnackBar>
                </div>
                <div className={this.state.isTestComplete ? 'quizBox shadow flex flexColumn' : 'quizBox shadow flex flexColumn hidden'} >
                    <h4 className="resultTitle">Quiz Results</h4>

                    <h5 className="sectionTitle">Question details</h5>

                    <div className="questionResultBlock">
                       {resultSet}
                    </div>

                    <div className="flex flexRow">
                        <div className="infoPanel">
                            <p className="infoTitle">No. of Questions</p>
                            <p className="infoText">{this.state.questions.length}</p>
                        </div>
                        <div className="infoPanel">
                            <p className="infoTitle">No. of Correct Answers</p>
                            <p className="infoText">{this.state.correctAnswers}</p>
                        </div>
                        <div className="infoPanel">
                            <p className="infoTitle">No. of Wrong Answers</p>
                            <p className="infoText">{this.state.questions.length - this.state.correctAnswers}</p>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default QuizBox;