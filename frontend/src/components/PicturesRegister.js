import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class PicturesRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmation: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // alert('An email was submitted: ' + this.state.email);
        // alert('A username was submitted: ' + this.state.username);
        // alert('A password was submitted: ' + this.state.password);
        // alert('A confirmation was submitted: ' + this.state.confirmation);

        fetch("http://127.0.0.1:8000/api/users/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                confirmation: this.state.confirmation,
            })
        });


        event.preventDefault();
    }

    render() {
        const { username, email, password, confirmation }
        return (
            <div>
                <div className="row">
                    <div className="col h2">Pictures</div>
                </div>
                <div className="row">
                    <div className="col h5">Sign up to see photos from your friends.</div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicUsername">
                                <Form.Control type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" name="confirmation" placeholder="Confirm Password" value={this.state.confirmation} onChange={this.handleChange} />
                            </Form.Group>

                            <Button variant="primary" type="submit" block>Sign up</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
