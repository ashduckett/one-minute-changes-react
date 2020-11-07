import React, { Component, Fragment } from 'react';
import classes from './../Modal/Modal.module.css';

class ModalButton extends Component {
    render() {
        
        return (
            <Fragment>
                <button onClick={this.props.clicked} className={"btn " + this.props.btnType} onClick={this.props.clicked}>
                    {this.props.children}
                </button>
            </Fragment>
        );
    }
}

export default ModalButton;