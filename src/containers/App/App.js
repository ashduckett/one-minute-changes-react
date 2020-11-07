import React, { Component } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import OneMinuteChanges from '../OneMinueChanges/OneMinuteChanges';
import { Route, withRouter } from 'react-router-dom';

class App extends Component {
    state = {
        user: null,
        changes: null
    }

    handleLoginSuccess = (user) => {
        this.setState({user: user});
    }

    componentDidMount() {
        if (!window.localStorage.getItem('user')) {
            this.props.history.push('/login');
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            this.handleLoginSuccess(user);
            this.props.history.push('/');

            
        }
        
        
        
        // else {

        //     if (window.localStorage.getItem('user_id')) {

        //     } else {
        //         axios({
        //             method: 'get',
        //             url: 'http://local.oneminutechanges.com/users/me',
        //             headers: {
        //                 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        //             }
        //         }).then((response) => {
        //             // this.props.onLogin(response.data);
        //             // window.localStorage.setItem('user_id', response.data.data.id);
        //             this.handleLoginSuccess(response.data);
                    
        //             //this.props.history.push('/');
        //         });
        //     }
        // }


    }


    render() {
        return (
            <div className="App">
                <Route path="/login" render={() => (<Login onLogin={this.handleLoginSuccess} />)} />
                <Route path="/register" component={Register} />
                <Route path="/" exact render={() => (<OneMinuteChanges user={this.state.user} />)} />
            </div>
        );
    }
}

export default withRouter(App);
