import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';
import classes from './../OneMinueChanges/OneMinuteChanges.module.css';
import ModalButton from '../../components/UI/ModalButton/ModalButton';
import ModalCountdown from '../../components/UI/ModalCountdown/ModalCountdown';
import ModalSubmit from '../../components/UI/ModalSubmit/ModalSubmit';
import ModalExerciseIntroduction from '../../components/UI/ModalExerciseIntroduction/ModalExerciseIntroduction';

class OneMinuteChanges extends Component {
    state = {
        changes: null,
        timerValue: 0,
        showModal: false,
        modalStep: 0,
        latestResult: 0,
        latestPracticeId: 0             // This should really come from the modal on submit  not be stored here I think
    }

    resultChangeHandler = (result) => {
        console.log('parent ' + result)
        this.setState({latestResult: result});
    }

    endOfExercise = () => {
        this.incrementStep();
    }

    componentDidMount() {
        axios.get('/chords/changes', {
            // grant_type: 'password',
            // client_id: '2',
            // client_secret: 'xZ1kOBYHq4Q50dbQXZeB8xOmU5q90mbVnwa6esFf',
            // username: this.state.email,
            // password: this.state.password
        }).then((response) => {
            this.setState({
                changes: response.data.data
            });
            console.log(this.state.changes)
        });
    }

    startClock = () => {

        
            let id = setInterval(() => {
                this.setState((prevState) => {
                    if (this.state.timerValue < 60) {

                        return {
                            timerValue: prevState.timerValue++
                        }
                    } else {
                        clearInterval(id);
                        return {
                            timerValue: prevState.timerValue
                        }
                        
                    }
                });
            }, 1000);
        }
    

    practice = (chordChangeId) => {
        this.setState({showModal: true, latestPracticeId: chordChangeId});
    }

    hideModal = () => {
        this.setState({showModal: false, modalStep: 0});
    }

    incrementStep = () => {
        this.setState((prevState) => {
            return {
                modalStep: prevState.modalStep++
            }
        });
    }

    submitUserResult = (result) => {
        axios.post('/chords/changes', {
            'user_id': localStorage.user_id,
            'change_id': this.state.latestPracticeId,       // I think this should be passed to this function but hack for now.
            'count': result
        }).then(() => {
            this.hideModal();
        })
    }

    render() {
        let currVal = 0;
        let jsx = [];

        if (this.state.changes && this.state.changes.length > 0) {
            const chordChanges = this.state.changes;

            for (let rows = 0; rows < 7; rows++) {
                let changes = [];
                for (let i = 0; i <= rows; i++) {
                    let inScopeVal = currVal;
                    changes.push(
                        <div className={classes.ChangeContainer} key={currVal}>
                            {(chordChanges[currVal].user_changes && chordChanges[currVal].user_changes.length > 0) ? chordChanges[currVal].user_changes[0].count : 0}
                            
                            <a href="#" onClick={() => this.practice(chordChanges[inScopeVal].id)}>Practice</a>
                        </div>)
                    currVal++;
                }
                jsx.push(<div className={classes.ChangesRow} key={`${rows + '_outer'}`}>{changes}</div>);
            }
        }

        return (   
            <div>
                <Modal visible={this.state.showModal} currentStep={this.state.modalStep}>
                    <ModalExerciseIntroduction closeModal={this.hideModal} nextStep={this.incrementStep} />
                    <ModalCountdown countdownEnded={this.endOfExercise}/>
                    <ModalSubmit closeModal={this.hideModal} submit={this.submitUserResult}></ModalSubmit>
                </Modal>
                {jsx}
            </div>
        )
    }
}

export default OneMinuteChanges;