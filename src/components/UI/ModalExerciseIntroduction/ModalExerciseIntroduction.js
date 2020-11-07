import React, { Component, Fragment } from 'react';
import ModalButton from './../ModalButton/ModalButton';
import classes from './../Modal/Modal.module.css';

class ModalExerciseIntroduction extends Component {
    render() {
        return (
            <Fragment>
                <div className={classes.ModalHeader}>
                    <h5 className={classes.ModalHeaderText}>Step 1</h5>
                </div>
                <div className={classes.ModalContent}>
                    <p>Practice switching between two chords rapidly to get it into your muscle memory.</p>
                </div>
                <div className={classes.ModalFooter}>
                    <ModalButton clicked={this.props.closeModal} btnType="default">Close</ModalButton>
                    <ModalButton clicked={this.props.nextStep} btnType="primary">Play</ModalButton>
                </div>
            </Fragment>
        );
    }
}

export default ModalExerciseIntroduction;