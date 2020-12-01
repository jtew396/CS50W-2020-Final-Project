import React from 'react';
import Cookies from 'js-cookie';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PicturesBody from './components/PicturesBody.js';
import PicturesNavbar from './components/PicturesNavbar.js';
import PicturesLogin from './components/PicturesLogin.js';
import PicturesRegister from './components/PicturesRegister.js';

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            auth: [],
            loaded: false,
            csrftoken: Cookies.get('csrftoken'),
            sessionid: Cookies.get('sessionid'),
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/?format=json")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong."}
                    });
                }
                return response.json();
            })
            .then(
                result => {
                    this.setState(() => {
                        return {
                            user: result.user,
                            auth: result.auth,
                            loaded: true
                        };
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const user = this.state.user;
        const auth = this.state.auth;
        return (
            <div className="App">
                <Router>
                    <PicturesNavbar data={this.state.data} user={this.state.user} auth={this.state.auth} csrftoken={this.state.csrftoken} sessionid={this.state.sessionid}></PicturesNavbar>
                    <Switch>
                        <Route exact path="/" render={
                                () => (<PicturesBody data={this.state.data} user={this.state.user} auth={this.state.auth}></PicturesBody>)
                            }
                        />
                        <Route exact path="/register" component={PicturesRegister} />
                        <Route exact path="/login" component={PicturesLogin} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
