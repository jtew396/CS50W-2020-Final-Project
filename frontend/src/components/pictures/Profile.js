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
    }


    render() {
        let isLoggedIn = this.props.logged_in;
        let isFollowing = this.props.is_following;


        return (
            <div>
                <h1>Profile</h1>
                <Card className="shadow my-2">
                    <Card.Body>
                        <Row>
                            <Col>
                                <div>
                                    <h5 className="pull-left"><Username /></h5>
                                </div>
                                <div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card.Text>{ this.props.following_count } Following</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text>{ this.props.followers_count } Followers</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <br/>
                <br/>
                <h1>Posts</h1>
                <Paginator></Paginator>
                <PicturesPosts></PicturesPosts>
                <Paginator></Paginator>
            </div>
        )
    }
}

function Username() {
    let { username } = useParams();
    return username;
}
