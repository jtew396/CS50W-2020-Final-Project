import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PicturesPosts from './Posts';
import Paginator from './Paginator';
import { useParams } from 'react-router';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_id: null,
            username: this.props.username,
            following_count: 0,
            followers_count: 0
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/pictures/user/' + window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1), {})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json.detail) {
                console.log(json.detail);
            } else {
                this.setState({ 
                    profile_id: json.id,
                    username: json.username,
                    following_count: json.followees,
                    followers_count: json.followers
                });
            }
            return null;
        });
    }


    render() {
        let isLoggedIn = this.props.logged_in;
        let isFollowing = this.props.is_following;
        console.log('printing the profile id')
        console.log(this.state.profile_id);

        return (
            <div>
                <h1>Profile</h1>
                <Card className="shadow my-2">
                    <Card.Body>
                        <Row>
                            <Col>
                                <div className="pull-left">
                                    <Card.Title><Username /></Card.Title>
                                </div>
                                <div className="pull-right">
                                    <FollowOptions isLoggedIn={true} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Text>{ this.state.following_count } Following</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>{ this.state.followers_count } Followers</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <br/>
                <br/>
                <h1>Posts</h1>
                <PicturesPosts profile_user_id={this.state.profile_id}/>
            </div>
        )
    }
}

function Username() {
    let { username } = useParams();
    return username;
}

function FollowOptions() {
    return null;
}