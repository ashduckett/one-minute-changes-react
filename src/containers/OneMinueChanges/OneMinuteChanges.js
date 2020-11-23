import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';
import classes from './../OneMinueChanges/OneMinuteChanges.module.css';
import ModalButton from '../../components/UI/ModalButton/ModalButton';
import ModalCountdown from '../../components/UI/ModalCountdown/ModalCountdown';
import ModalSubmit from '../../components/UI/ModalSubmit/ModalSubmit';
import ModalExerciseIntroduction from '../../components/UI/ModalExerciseIntroduction/ModalExerciseIntroduction';
import ChordChangeButton from '../../components/ChordChangeButton/ChordChangeButton';

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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // TODO: Sort these on the backend.
        // console.log('HELLO')
        axios.get('/chords/changes').then((response) => {
            console.log(response)
            this.setState({ changes : response.data })
        });



        // axios.get('/chords/changes', {
        //     // grant_type: 'password',
        //     // client_id: '2',
        //     // client_secret: 'xZ1kOBYHq4Q50dbQXZeB8xOmU5q90mbVnwa6esFf',
        //     // username: this.state.email,
        //     // password: this.state.password
        // }).then((response) => {
        //     this.setState({
        //         changes: response.data.data
        //     });
        //     console.log(this.state.changes)
        // });
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
        console.log('RENDER')
        //console.log(this.state.changes);
        const changes = this.state.changes;
        let maxColCount = 1;
        let currentCol = 0;
      
        
        if (changes) {
            
            for (let i = 0; i < changes.length; i++) {
                
                if (maxColCount < changes.length) {
                    
                    if (currentCol < maxColCount) {
                        console.log(i)
                        currentCol++;
                    } else {
                        console.log(i)
                        console.log('break')
                        currentCol = 0;
                        maxColCount++;
                    }
                }
                
            }
        }


        return (   
            <div>
                {/* <Modal visible={this.state.showModal} currentStep={this.state.modalStep}>
                    <ModalExerciseIntroduction closeModal={this.hideModal} nextStep={this.incrementStep} />
                    <ModalCountdown countdownEnded={this.endOfExercise}/>
                    <ModalSubmit closeModal={this.hideModal} submit={this.submitUserResult}></ModalSubmit>
                </Modal> */}
                {/* {jsx} */}
                In Progress
            </div>
        )
    // }
    }
}

export default OneMinuteChanges;