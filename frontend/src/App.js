import React, { Component } from 'react';
import LoginForm from './components/pictures/LoginForm';
import RegisterForm from './components/pictures/RegisterForm';
import PicturesNavbar from './components/pictures/Navbar';
import PicturesBody from './components/pictures/Body';
import Post from './components/pictures/Post';
import PicturesPosts from './components/pictures/Posts';
import Profile from './components/pictures/Profile';
import Following from './components/pictures/Following';
import PicturesAllPosts from './components/pictures/AllPosts';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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
            });
        } else {
            localStorage.removeItem('token');
            this.setState({ logged_in: false, username: '', user_id: null });
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
            <div className="">
                <PicturesNavbar
                    logged_in={this.state.logged_in}
                    user_id={this.state.user_id}
                    username={this.state.username}
                    display_form={this.display_form}
                    handle_logout={this.handle_logout}
                />
                <div className="m-3">
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <PicturesBody
                                    logged_in={this.state.logged_in}
                                    user_id={this.state.user_id}
                                    handle_post={this.handle_post}
                                    username={this.state.username}
                                    posts={this.state.posts}
                                    post_redirect={this.state.post_redirect}
                                    history={this.state.history}
                                />
                            </Route>
                            <Route exact path="/login">
                                <LoginForm
                                    handle_login={this.handle_login}
                                    redirect={this.state.redirect}
                                />
                            </Route>
                            <Route exact path="/register">
                                <RegisterForm
                                    handle_register={this.handle_register}
                                    redirect={this.state.redirect}
                                />
                            </Route>
                            <Route exact path="/post">
                                <Post
                                    user_id={this.state.user_id}
                                    handle_post={this.handle_post}
                                    redirect={this.state.redirect}
                                />
                            </Route>
                            <Route exact path="/all_posts">
                                <PicturesAllPosts 
                                    logged_in={this.state.logged_in}
                                    user_id={this.state.user_id}
                                    handle_post={this.handle_post}
                                    username={this.state.username}
                                    redirect={this.state.redirect}
                                    posts={this.state.posts}
                                />
                            </Route>
                            <Route exact path="/following">
                                <Following
                                    user_id={this.state.user_id}
                                />
                            </Route>
                            <Route exact path="/profile/:username">
                                <Profile
                                    user_id={this.state.user_id}
                                />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}
