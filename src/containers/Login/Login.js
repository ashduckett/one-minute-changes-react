import React, { Component } from 'react';
import classes from '../Login/Login.module.css';

class Login extends Component {
    render() {
        return (
            <div className={classes.Login}>
                <div className={classes.FormContainer}>
                    <div className={classes.HeadersContainer}>
                        <h2>Welcome Back to One Minute Changes</h2>
                        <h3 className={classes.Subheader}>Got time to practice? Don't miss the chance to take your playing to the next level.</h3>
                    </div>
                    <form className={classes.Form}>
                        <input className={classes.Input} type="text" placeholder="Email"></input>
                        <input className={classes.Input} type="password" placeholder="Password"></input>
                        <a href="#" className={classes.Submit}>Sign in</a>
                        <a href="#" className={classes.ForgottenPassword}>Forgot Password?</a>
                        <p>New to One Minute Changes? <a href="#">Join now</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;