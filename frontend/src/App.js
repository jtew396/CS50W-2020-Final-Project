// import React from 'react';
// import Cookies from 'js-cookie';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import PicturesBody from './components/PicturesBody.js';
// import PicturesNavbar from './components/PicturesNavbar.js';
// import PicturesLogin from './components/PicturesLogin.js';
// import PicturesRegister from './components/PicturesRegister.js';

// import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: [],
//             auth: [],
//             loaded: false,
//             csrftoken: Cookies.get('csrftoken'),
//             sessionid: Cookies.get('sessionid'),
//         };
//     }

//     componentDidMount() {
//         fetch("http://127.0.0.1:8000/api/?format=json")
//             .then(response => {
//                 if (response.status > 400) {
//                     return this.setState(() => {
//                         return { placeholder: "Something went wrong."}
//                     });
//                 }
//                 return response.json();
//             })
//             .then(
//                 result => {
//                     this.setState(() => {
//                         return {
//                             user: result.user,
//                             auth: result.auth,
//                             loaded: true
//                         };
//                     });
//                 },
//                 error => {
//                     this.setState({
//                         isLoaded: true,
//                         error
//                     });
//                 }
//             )
//     }

//     render() {
//         const user = this.state.user;
//         const auth = this.state.auth;
//         return (
//             <div className="App">
//                 <Router>
//                     <PicturesNavbar data={this.state.data} user={this.state.user} auth={this.state.auth} csrftoken={this.state.csrftoken} sessionid={this.state.sessionid}></PicturesNavbar>
//                     <Switch>
//                         <Route exact path="/" render={
//                                 () => (<PicturesBody data={this.state.data} user={this.state.user} auth={this.state.auth}></PicturesBody>)
//                             }
//                         />
//                         <Route exact path="/register" component={PicturesRegister} />
//                         <Route exact path="/login" component={PicturesLogin} />
//                     </Switch>
//                 </Router>
//             </div>
//         );
//     }
// }

// export default App;


import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import PicturesNavbar from './components/PicturesNavbar';
import PicturesBody from './components/PicturesBody';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
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
          username: json.user.username
        });
      });
  };

  handle_signup = (e, data) => {
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
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <PicturesNavbar
          logged_in={this.state.logged_in}
          username={this.state.username}
          display_form={this.display_form}
          handle_logout={this.handle_logout}
        />
        <PicturesBody
          logged_in={this.state.logged_in}
          username={this.state.username}
        />
        {form}
        <h3>
          {this.state.logged_in
            ? `Hello, ${this.state.username}`
            : 'Please Log In'}
        </h3>
      </div>
    );
  }
}

export default App;