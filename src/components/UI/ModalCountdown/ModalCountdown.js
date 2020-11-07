import React, { Component, Fragment } from 'react';
import Modal from '../Modal/Modal';
import classes from './../Modal/Modal.module.css';
import ModalButton from './../ModalButton/ModalButton';

class ModalCountdown extends Component {
    state = {
        countdown: 5,
        changeTimer: 60
    }

    changeTimerFinished = () => {
        this.props.countdownEnded();
    }

    startTimer() {
        // Fires one more time 
        let timerRef = setInterval(() => {
            if (this.state.countdown == 1) this.startChangeTimer();
            this.setState((prevState) => {
               
                
                if (this.state.countdown >= 0) {

                    return {
                        countdown: prevState.countdown--

                    }
                    
                } else {
                    clearInterval(timerRef);
                    // this.startChangeTimer();
                }
            });
        }, 1000);
    }

    startChangeTimer() {
        let timerRef = setInterval(() => {
            this.setState((prevState) => {
                if (this.state.changeTimer >= 0) {
                    return {
                        changeTimer: prevState.changeTimer--
                    }
                } else {
                    // clearInterval(timerRef);
                }
            });

            if (this.state.changeTimer === 0) {
                clearInterval(timerRef);
                this.changeTimerFinished();
            }

        }, 1);
    }
        
    
    componentDidMount() {
        this.startTimer();
    }
    
    render() {
        return (
            <Fragment>
                <div className={classes.ModalHeader}>
                    <h5 className={classes.ModalHeaderText}>Step 2</h5>
                </div>
                <div className={classes.ModalContent}>
                <p>{this.state.countdown <= 0 ? 'Go' : this.state.countdown}</p>
                <p>Change Timer: {this.state.changeTimer}</p>
                </div>
                <div className={classes.ModalFooter}>
                    <ModalButton clicked={this.props.closeModal} btnType="default">Close</ModalButton>
                </div>
            </Fragment>




            // <Fragment>
            //     {/* <p>{this.state.countdown <= 0 ? 'Go' : this.state.countdown}</p>
            //     <p>Change Timer: {this.state.changeTimer}</p> */}
            // </Fragment>
        );
    }
}

export default ModalCountdown;