import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class PicturesPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/pictures/posts/', {
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
                this.setState({ posts: json });
            }
            return null;
        });
    }

    render() {
        console.log(this.state.posts);

        return (
            <div>
                {this.state.posts.map(
                    post => <PostCard
                        key={post.uniqueId}
                        post={post}
                        logged_in={this.props.logged_in}
                    />
                )}
            </div>
        )
    }
}

function PostCard(props) {
    const isPostLiked = false;
    const isLoggedIn = props.logged_in;
    const isCreatedByUser = props.created_by_user;

    return (
        <Card className="shadow my-2">
            <Card.Body>
                <Card.Title>{props.post.created_by_username}</Card.Title>
                <Options isCreatedByUser={isCreatedByUser} />
                <Card.Text>
                    {props.post.content}
                </Card.Text>
                <Card.Text className="text-muted">
                    {props.post.created_at}
                </Card.Text>
                <LikeButton isLoggedIn={isLoggedIn} isPostLiked={isPostLiked} /> <a>0</a>
                <Comment isLoggedIn={isLoggedIn} />
            </Card.Body>
        </Card>
    )
}

function Options(props) {
    const isCreatedByUser = props.isCreatedByUser;
    if (isCreatedByUser) {
        return <UserOptions />;
    }
    
    return null;
}


function UserOptions(props) {
    return (
        <Card.Text>
            <Row>
                <div className="col-1">
                    <Button size="sm">Edit</Button>
                </div>
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </Card.Text>
    );
}

function LikeButton(props) {
    const isPostLiked = props.isPostLiked;

    const likeStyle = {
        text: {
            decoration: 'none'
        }
    };

    if (isPostLiked) {
        return (
            <a style={likeStyle} className="fa fa-heart text-danger"> </a>
        );
    } else {
        return (
            <a style={likeStyle} className="fa fa-heart-o text-danger"> </a>
        );
    }

    return null;
}

function Comment(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
            <Card.Text className="text-muted">Comment</Card.Text>
        );
    }

    return null;
}
