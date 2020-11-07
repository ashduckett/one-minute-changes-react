import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from '../Register/Register.module.css';
import axios from 'axios';

class Register extends Component {
    state = {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        passwordConfirmation: null,
        registrationInProgress: false
    }

    handleRegisterClickHandler = () => {
        this.setState({registrationInProgress: true});
        axios.post('http://local.oneminutechanges.com/oauth/token', {
            grant_type: 'client_credentials',
            client_id: '1',
            client_secret: 'Z1ZhsVBAi4tLCqNYWs42rAuyQzUo2SEhK7qDJ1Ep'
        }).then((response) => {
            const access_token = response.data.access_token;

            axios({
                method: 'post',
                url: 'http://local.oneminutechanges.com/users',
                data: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.passwordConfirmation
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }).then((e) => {
                this.setState({registrationInProgress: false})
                console.log(e);
            }).catch((e) => {
                this.setState({registrationInProgress: false})
                console.log(e);
            })
        }).catch((e) => {
            this.setState({registrationInProgress: false})
            console.log(e);
        })
    };
    
    
    render() {
        return (
            <div>
                <div className={classes.Login}>
                <div className={classes.FormContainer}>
                    <div className={classes.HeadersContainer}>
                        <h2>Thank you for signing up</h2>
                        <h3 className={classes.Subheader}>This is just the first step towards become a great guitarist.</h3>
                    </div>
                    <form className={classes.Form}>
                        <input className={classes.Input} type="text" placeholder="First Name" onInput={(evt) => this.setState({firstname: evt.target.value})}></input>
                        <input className={classes.Input} type="text" placeholder="Last Name" onInput={(evt) => this.setState({lastname: evt.target.value})}></input>
                        <input className={classes.Input} type="text" placeholder="Email" onInput={(evt) => this.setState({email: evt.target.value})}></input>
                        <input className={classes.Input} type="password" placeholder="Password" onInput={(evt) => this.setState({password: evt.target.value})}></input>
                        <input className={classes.Input} type="password" placeholder="Confirm Password" onInput={(evt) => this.setState({passwordConfirmation: evt.target.value})}></input>
                        <a href="#" className={classes.Submit} onClick={this.handleRegisterClickHandler}>{this.state.registrationInProgress ? 'Please wait...' : 'Register'}</a>
                        <p className={classes.BackToLogin}><NavLink to="/login">Back to login</NavLink></p>
                    </form>
                </div>
            </div>
                <NavLink to="/login">Back to login</NavLink>
            </div>
        );
    }
}

export default Register;