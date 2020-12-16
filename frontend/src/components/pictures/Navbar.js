import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class PicturesNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Pictures</Navbar.Brand>
                { this.props.logged_in
                    ?
                    <Navbar.Collapse id="navbar">
                          <Nav className="mr-auto">
                              <Nav.Item><Nav.Link><strong>{this.props.username}</strong></Nav.Link></Nav.Item>
                          </Nav>
                          <Nav className="ml-auto">
                              <Nav.Item><Nav.Link onClick={this.props.handle_logout}>Log Out</Nav.Link></Nav.Item>
                          </Nav>
                    </Navbar.Collapse>
                    :
                    <Navbar.Collapse id="navbar">
                        <Nav className="ml-auto">
                            {/* <Nav.Item><Nav.Link onClick={() => this.props.display_form('login')}>Log In</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link onClick={() => this.props.display_form('signup')}>Register</Nav.Link></Nav.Item> */}
                            <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link href="register">Register</Nav.Link></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                }
            </Navbar>
        )
    }
}
