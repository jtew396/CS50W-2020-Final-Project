import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';


export default class PicturesNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
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
            <Card>
                <Card.Body>
                    <Form onSubmit={e => this.props.handle_post(e, this.state)}>
                        <Form.Group>
                            <Card.Title>New Post</Card.Title>
                            <Form.Control as="textarea" name="content" placeholder="Your post content..." value={this.state.content} onChange={this.handle_change} className="mb-1"></Form.Control>
                            <Button variant="primary" type="submit">Post</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}
