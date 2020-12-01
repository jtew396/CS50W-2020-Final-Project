import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Link } from "react-router-dom";

export default class PicturesNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            viewForm: false,
        };
    }

    handleClick() {
        this.setState(state => ({

        }))
    }

    render() {
        const user = this.props.user;
        const auth = this.props.auth;
        const csrftoken = this.props.csrftoken;
        const sessionid = this.props.sessionid;
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Pictures</Navbar.Brand>
                { auth
                    ?
                    <Navbar.Collapse id="navbar">
                          <Nav className="mr-auto">
                              <Nav.Item><Nav.Link href="#home"><strong></strong></Nav.Link></Nav.Item>
                          </Nav>
                          <Nav className="ml-auto">
                              <Nav.Item><Nav.Link href="#home">Log Out</Nav.Link></Nav.Item>
                          </Nav>
                    </Navbar.Collapse>
                    :
                    <Navbar.Collapse id="navbar">
                        <Nav className="ml-auto">
                            <Nav.Item><Link to="/login" className="nav-link">Log In</Link></Nav.Item>
                            <Nav.Item><Link to="/register" className="nav-link">Register</Link></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                }
            </Navbar>
        )
    }
}
