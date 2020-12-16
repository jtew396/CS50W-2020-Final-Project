import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

export default class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    if (this.props.redirect) {
      return <Redirect to={this.props.redirect} />
    }

    let isLoggedIn = this.props.is_logged_in;
    let message;
    if (isLoggedIn) {
      message = <div>This is the message.</div>
    } else {
      message = null;
    }
    return (
      <Container>
        <Row className="m-3">
          <Col></Col>
          <Col>
            <h2>Login</h2>  
            {message}
            <Form onSubmit={e => this.props.handle_login(e, this.state)}>
              <Form.Group>
                {/* <Form.Label htmlFor="username">Username</Form.Label> */}
                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handle_change}></Form.Control>
              </Form.Group>
              <Form.Group>
                {/* <Form.Label htmlFor="password">Password</Form.Label> */}
                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handle_change}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form.Group>
            </Form>
            <br/>
            Don't have an account? <a href="/register">Register here.</a>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}


LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};