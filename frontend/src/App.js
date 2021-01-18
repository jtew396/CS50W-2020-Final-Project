import React, { Component } from 'react';
import './App.css';
import WeekContainer from './components/weather/WeekContainer';

import LoginForm from './components/pictures/LoginForm';
import RegisterForm from './components/pictures/RegisterForm';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayed_form: '',
            logged_in: localStorage.getItem('token') ? true : false,
            user_id: null,
            username: '',
            redirect: null,
            post_redirect: null,
            posts: [],
            history: null,
            post_page: 1
        };
    }

    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8000/pictures/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({ username: json.username, user_id: json.id });
            })
        }
    }

    handle_login = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.token);
            this.setState({
                logged_in: true,
                displayed_form: '',
                username: json.user.username,
                user_id: json.user.id,
                redirect: '/'
            });
        });
    };

    handle_register = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/pictures/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.token);
            this.setState({
                logged_in: true,
                displayed_form: '',
                username: json.username,
                user_id: json.id,
                redirect: '/'
            });
        });
    };

    handle_logout = () => {
        localStorage.removeItem('token');
        this.setState({ logged_in: false, username: '', user_id: null });
    };

    display_form = form => {
        this.setState({
            displayed_form: form
        });
    };

    render() {
        let form;
        switch (this.state.displayed_form) {
            case 'login':
                form = <LoginForm handle_login={this.handle_login} />;
                break;
            case 'signup':
                form = <RegisterForm handle_signup={this.handle_signup} />;
                break;
            default:
                form = null;
        }

        return (
            <div className="App">
                <WeekContainer />
            </div>
        );
    }
}
