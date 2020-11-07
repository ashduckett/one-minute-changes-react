import React, { Component, Fragment } from 'react';
import classes from './../Modal/Modal.module.css';
import ModalButton from './../ModalButton/ModalButton';

class ModalSubmit extends Component {
    state = {
        result: ''
    };
    

    // This state could probably be handed back to the modal
    resultChangeHandler = (evt) => {
        this.setState({result: evt.target.value});
        // this.props.resultChangeHandler(evt.target.value);
    }
    
    render() {
        return (
            <Fragment>
            <div className={classes.ModalHeader}>
                <h5 className={classes.ModalHeaderText}>Step 3</h5>
            </div>
            <div className={classes.ModalContent}>
                <label>Enter result</label>
                <input type="text" value={this.state.result} onChange={(evt) => this.resultChangeHandler(evt)}></input>
            </div>
            <div className={classes.ModalFooter}>
                <ModalButton clicked={this.props.closeModal} btnType="default">Close</ModalButton>
                <ModalButton clicked={() => this.props.submit(this.state.result)} btnType="primary">Submit</ModalButton>
            </div>
        </Fragment>



            // <Fragment>
            //     <label>Enter result</label>
            //     <input type="text" value={this.state.result} onChange={(evt) => this.resultChangeHandler(evt)}></input>
            // </Fragment>
        )
    }
}

export default ModalSubmit;