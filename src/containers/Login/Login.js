import React, { Component } from 'react';
import classes from '../Login/Login.module.css';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    loginHandler = () => {

        // This request is failing. Why.
        axios.post('http://local.oneminutechanges.com/oauth/token', {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'VgJQ08DXurKgDvohge3ZlBCTE2rknNZxY8dkxAOW',
            username: this.state.email,
            password: this.state.password
        }).then((response) => {
            const access_token = response.data.access_token;
            console.log(access_token)
            // Here we can store the access token
            window.localStorage.setItem('access_token', access_token);

            // First protect the user with auth state.
            axios({
                method: 'get',
                url: 'http://local.oneminutechanges.com/users/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }).then((response) => {
                this.props.onLogin(response.data);
                window.localStorage.setItem('user_id', response.data.data.id);
                
                // Store the entire user
                window.localStorage.setItem('user', JSON.stringify(response.data.data));

                this.props.history.push('/');
            });
        });
    }
    
    render() {
        return (
            <div className={classes.Login}>
                <div className={classes.FormContainer}>
                    <div className={classes.HeadersContainer}>
                        <h2>Welcome Back to One Minute Changes</h2>
                        <h3 className={classes.Subheader}>Got time to practice? Don't miss the chance to take your playing to the next level.</h3>
                    </div>
                    <form className={classes.Form}>
                        <input className={classes.Input} type="text" placeholder="Email" value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}></input>
                        <input className={classes.Input} type="password" placeholder="Password" value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})}></input>
                        <a href="#" className={classes.Submit} onClick={this.loginHandler}>Sign in</a>
                        <a href="#" className={classes.ForgottenPassword}>Forgot Password?</a>
                        <p className={classes.NewToSite}>New to One Minute Changes? <NavLink to="/register">Join now</NavLink></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);