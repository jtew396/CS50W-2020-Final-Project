import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Paginator from './Paginator';
import moment from 'moment';

export default class PicturesPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            page: 1,
            next_link: null,
            prev_link: null,
            update_posts: props.update_posts
        }
        this.updatePosts = this.updatePosts.bind(this);
    }

    componentDidMount() {
        if (this.props.profile_user_id ) {
            fetch('http://localhost:8000/pictures/posts/?page=' + String(this.state.page) + '&created_by=' + String(this.props.profile_user_id), {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.detail) {
                    console.log(json.detail);
                } else {
                    this.setState({ 
                        posts: json.data,
                        next_link: json.links.next,
                        prev_link: json.links.previous
                    });
                }
                return null;
            });
        } else {
            fetch('http://localhost:8000/pictures/posts/?page=' + String(this.state.page), {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.detail) {
                    console.log(json.detail);
                } else {
                    this.setState({ 
                        posts: json.data,
                        next_link: json.links.next,
                        prev_link: json.links.previous
                    });
                }
                return null;
            });
        }
    }

    updatePosts() {
        if (this.props.profile_user_id) {
            fetch('http://localhost:8000/pictures/posts/?page=' + String(this.state.page) + '&created_by=' + String(this.props.profile_user_id), {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.detail) {
                    console.log(json.detail);
                } else {
                    this.setState({ 
                        posts: json.data,
                        next_link: json.links.next,
                        prev_link: json.links.previous
                    });
                }
                return null;
            });
        } else {
            fetch('http://localhost:8000/pictures/posts/?requested_by=' + String(this.props.user_id), {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.detail) {
                    console.log(json.detail);
                } else {
                    this.setState({ 
                        posts: json.data,
                        next_link: json.links.next,
                        prev_link: json.links.previous,
                        update_posts: false
                    });
                }
                return null;
            });
        }
    }

    handle_page_change = link => {
        console.log(link);

        fetch(link, {})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.detail) {
                console.log(json.detail);
            } else {
                this.setState({ 
                    posts: json.data,
                    next_link: json.links.next,
                    prev_link: json.links.previous
                });
            }
        });
    }

    render() {
        console.log(this.state.posts);
        console.log('This is the update posts state');
        console.log(this.props.update_posts);
        if (this.props.update_posts) {
            this.updatePosts();
            this.props.makeUpdatePosts();
        }
        if (this.props.profile_user_id) {
            this.updatePosts();
        }

        return (
            <div>
                <Paginator page={this.state.page} handle_page_change={this.handle_page_change} next_link={this.state.next_link} prev_link={this.state.prev_link}/>
                {this.state.posts.map(
                    post => <PostCard
                        key={post.id}
                        post={post}
                        logged_in={this.props.logged_in}
                        username={this.props.username}
                        makeUpdatePosts={this.props.makeUpdatePosts}
                    />
                )}
                <Paginator page={this.state.page} handle_page_change={this.handle_page_change} next_link={this.state.next_link} prev_link={this.state.prev_link}/>
            </div>
        )
    }
}

class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            edit_text: props.post.content,
        };
    }

    handleLike = () => {
        console.log('You have clicked on the like for post ' + String(this.props.post.id));
        const data = {
            post_id: this.props.post.id
        }

        fetch('http://localhost:8000/pictures/likes/', {
            method: 'POST',
            headers: {
                'Authorization': `JWT ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if (data === 'Liked') {
                this.setState({
                    is_liked: true
                });
            } else if (data === 'Unliked'){
                this.setState({
                    is_liked: false
                });
            }
        });
        this.props.makeUpdatePosts();
    }

    handleEdit = (type) => {
        if (type === 'Edit') {
            console.log('You clicked edit');
            this.setState({
                edit: true
            });
        } else if (type === 'Cancel') {
            console.log('You clicked cancel');
            this.setState({
                edit: false,
                edit_text: ''
            });
        } else if (type === 'Save') {
            console.log('You clicked save');
            const data = {
                id: this.props.post.id,
                content: this.state.edit_text,
                created_at: this.props.post.created_at,
                created_by: this.props.post.created_by
            }
            console.log('This is the data');
            console.log(data);
            fetch('http://localhost:8000/pictures/post/' + String(this.props.post.id) + '/', {
                method: 'PUT',
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    edit: false
                });
            });
            this.props.makeUpdatePosts();
        }
    }

    handleFormChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        console.log('This is the name');
        console.log(name);
        console.log('This is the value');
        console.log(value);
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    render() {
        let isPostLiked = false;
        const isLoggedIn = this.props.logged_in;
        let isCreatedByUser = false;
        let postDate = moment(this.props.post.created_at).format('LLL');
        
        if (this.props.post.created_by_username === this.props.username) {
            isCreatedByUser = true;
        }
        
        return (
            <Card className="shadow my-2">
                <Card.Body>
                    <Card.Title><b>{this.props.post.created_by_username}</b></Card.Title>
                    <Options isCreatedByUser={isCreatedByUser} edit={this.state.edit} handleEdit={this.handleEdit}/>
                    <CardText edit={this.state.edit} edit_text={this.state.edit_text} content={this.props.post.content} handleFormChange={this.handleFormChange}/>
                    <Card.Text className="text-muted">{postDate}</Card.Text>
                    <LikeButton logged_in={this.props.logged_in} is_liked={this.props.post.user_liked} handleLike={this.handleLike}/> <a>{this.props.post.likes}</a>
                    <Comment logged_in={this.props.logged_in} />
                </Card.Body>
            </Card>
        )
    }
}

function CardText(props) {
    if (props.edit) {
        return (
            <Form.Control className="my-1" as="textarea" rows={3} type="text" placeholder={props.edit_text} name="edit_text" onChange={props.handleFormChange}></Form.Control>
        )
    } else {
        return (
            <Card.Text>{props.content}</Card.Text>
        )
    }
}


class Options extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        const isCreatedByUser = this.props.isCreatedByUser;
        let options = null;

        if (isCreatedByUser) {
            options = <UserOptions isEdit={this.props.edit} handleEdit={this.props.handleEdit}/>;
        }

        return (
            <div>
                {options}
            </div>
        )
    }
}


function UserOptions(props) {
    if (props.isEdit) {
        return (
            <div className="card-text">
                <Row>
                    <div className="col-1">
                        <Button onClick={() => props.handleEdit('Cancel')} size="sm">Cancel</Button>
                    </div>
                    <div className="col-1">
                        <Button onClick={() => props.handleEdit('Save')} size="sm">Save</Button>
                    </div>
                </Row>
            </div>
        );
    } else {
        return (
            <div className="card-text">
                <Row>
                    <div className="col-1">
                        <Button onClick={() => props.handleEdit('Edit')} size="sm">Edit</Button>
                    </div>
                </Row>
            </div>
        );
    }
}

function handleEdit() {
    console.log('You have clicked edit');
}

function handleCancelEdit() {
    console.log('You have clicked cancel edit');
}

function handleSaveEdit() {
    console.log('You have clicked save edit');
}

function LikeButton(props) {
    const isLiked = props.is_liked;
    const isLoggedIn = props.logged_in;

    const likeStyle = {
        text: {
            decoration: 'none'
        }
    };

    if (isLoggedIn) {
        if (isLiked) {
            return (
                <a style={likeStyle} className="fa fa-heart text-danger" onClick={props.handleLike}> </a>
            );
        } else {
            return (
                <a style={likeStyle} className="fa fa-heart-o text-danger" onClick={props.handleLike}> </a>
            );
        }
    } else {
        return (
            <a style={likeStyle} className="fa fa-heart-o text-danger"> </a>
        );
    }
}

function Comment(props) {
    const isLoggedIn = props.logged_in;
    if (isLoggedIn) {
        return (
            <Card.Text className="text-muted">Comment</Card.Text>
        );
    } else {
        return null;
    }
}
