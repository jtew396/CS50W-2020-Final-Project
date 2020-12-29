import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory, Redirect } from 'react-router-dom';


export default class PicturesNewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            post_redirect: null
        };

        this.handle_change = this.handle_change.bind(this);
        this.handle_post = this.handle_post.bind(this);
    }

    handle_post = (e, data) => {
        e.preventDefault();
        fetch('http://localhost:8000/pictures/posts/', {
            method: 'POST',
            headers: {
                'Authorization': "JWT " + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        console.log(window.location.href);
        if (window.location.href === 'http://localhost:3000/post') {
            this.setState({
                post_redirect: '/'
            });
        } else {
            window.location.reload();
        }
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
        if (this.state.post_redirect) {
            return <Redirect to={this.state.post_redirect} />
        }

        return (
            <Card>
                <Card.Body>
                    <Form onSubmit={e => this.handle_post(e, this.state)}>
                        <Form.Group>
                            <Card.Title>New Post</Card.Title>
                            <Form.Control as="textarea" name="content" placeholder="Your post content..." value={this.state.content} onChange={this.handle_change} className="mb-1"></Form.Control>
                            <Button variant="primary" type="submit" >Post</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}