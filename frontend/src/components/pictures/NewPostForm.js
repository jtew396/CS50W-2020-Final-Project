import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class PicturesNewPost extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Form action="/post" method="post">
                        <Form.Group>
                            <Card.Title>New Post</Card.Title>
                            <Form.Control as="textarea" name="content" placeholder="Your post content..." className="mb-1"></Form.Control>
                            <Button variant="primary" type="submit">Post</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}