import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

export default class RegisterForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: ''
      };
  }

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

    return (
      <Container className="text-center">
        <Row className="m-3">
          <Col></Col>
          <Col>
            <h2>Register</h2>
            <Form onSubmit={e => this.props.handle_register(e, this.state)}>
              <Form.Group>
                <Form.Control autofocus type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handle_change} ></Form.Control>
              </Form.Group>
              {/* <Form.Group>
                <Form.Control type="email" name="email" placeholder="Email Address" ></Form.Control>
              </Form.Group> */}
              <Form.Group>
                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handle_change} ></Form.Control>
              </Form.Group>
              {/* <Form.Group>
                <Form.Control type="password" name="confirmation" placeholder="Confirm Password" ></Form.Control>
              </Form.Group> */}
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <br/>
            Already have an account? <a href="/login">Login here.</a>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}


RegisterForm.propTypes = {
    handle_register: PropTypes.func.isRequired
};
