import React, { Component } from 'react';
import classes from '../Modal/Modal.module.css';
import ModalButton from '../ModalButton/ModalButton';

class Modal extends Component {
    state = {
        currentStep: 0
    }
    
    render() {
        let output = null;

        if (this.props.visible) {
            output = (
                <React.Fragment>
                    <div className={classes.Overlay}></div>
                    <div className={classes.Modal}>
                        {this.props.children[this.props.currentStep]}
                    </div>
                </React.Fragment>
            )
        }

        return (
            output
        )
    }
}

export default Modal;