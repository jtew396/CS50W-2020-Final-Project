import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class PicturesPosts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.posts);

        return (
            <div>
                {this.props.posts.map(
                    post => <PostCard
                        post = {post}
                        logged_in = {this.props.logged_in}
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
}

function Comment(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return (
            <Card.Text className="text-muted">Comment</Card.Text>
        );
    }
}
