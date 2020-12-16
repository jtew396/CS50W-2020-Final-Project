import React, { Component } from 'react';
import LoginForm from './components/pictures/LoginForm';
import RegisterForm from './components/pictures/RegisterForm';
import PicturesNavbar from './components/pictures/Navbar';
import PicturesBody from './components/PicturesBody';
import Post from './components/pictures/Post';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      redirect: null
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
          this.setState({ username: json.username });
        });
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
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
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
        <Router>
          <PicturesNavbar
            logged_in={this.state.logged_in}
            username={this.state.username}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
          />
          <Route exact path="/">
            <PicturesBody
              logged_in={this.state.logged_in}
              username={this.state.username}
            />
          </Route>
          <Route exact path="/login">
            <LoginForm handle_login={this.handle_login} />
          </Route>
          <Route exact path="/logout">
          </Route>
          <Route exact path="/register">
            <RegisterForm handle_register={this.handle_register} />
          </Route>
          <Route exact path="/post">
            <Post />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;