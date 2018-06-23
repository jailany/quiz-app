import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component{

    constructor(){
        super();
        this.state = {
            seconds : '0',
            minutes : '0',
            durationInMinutes : 0.2
        };
    }

    timerComplete(){
        this.props.completeTest();
    }

    startTimer() {
        const currentDate = new Date();
        const target = new Date(currentDate.getTime() + this.props.durationInMinutes*60000).getTime();
        const _this = this;
        _this.interval = setInterval(() => {
            const now = new Date().getTime();
            const diff = target - now;
            const seconds = Math.floor((diff % (1000 * 60)) / 1000), minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            _this.setState({seconds : seconds, minutes : minutes});

            if(diff <= 1000) {
                clearInterval(_this.interval);
                _this.timerComplete();
            }
        }, 500); 
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount(){
        this.stopTimer();
    }



    render() {
        return (
            <h2 className="timer">{this.state.minutes ? (this.state.minutes < 10 ? '0'+this.state.minutes : this.state.minutes ) : '00'}:{this.state.seconds ? (this.state.seconds < 10 ? '0'+this.state.seconds : this.state.seconds) : '00'}</h2>
        )
    }
}

export default Timer;