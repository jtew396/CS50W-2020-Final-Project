import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class PicturesLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

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
        fetch("http://127.0.0.1:8000/api/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col h2">Pictures</div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col">
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Control type="text" placeholder="Username" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit" block>Log in</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
