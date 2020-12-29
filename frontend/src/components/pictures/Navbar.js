import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

console.log('Navbar', Navbar);
console.log('Nav', Nav);

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
                              <Nav.Link href={"/profile/" + this.props.username}><strong>{this.props.username}</strong></Nav.Link>
                              <Nav.Link href="/all_posts">All Posts</Nav.Link>
                              <Nav.Link href="/following">Following</Nav.Link>
                              <Nav.Link href="/post">Create Post</Nav.Link>
                          </Nav>
                          <Nav className="ml-auto">
                              <Nav.Link onClick={this.props.handle_logout}>Log Out</Nav.Link>
                          </Nav>
                    </Navbar.Collapse>
                    :
                    <Navbar.Collapse id="navbar">
                        <Nav className="mr-auto">
                            <Nav.Link href="/all_posts">All Posts</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                }
            </Navbar>
        )
    }
}
