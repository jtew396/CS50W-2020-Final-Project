import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PicturesNewPost from './NewPostForm';
import PicturesPosts from './Posts';
import Paginator from './Paginator';

export default class PicturesAllPosts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>All Posts</h1>
                <PicturesPosts
                    logged_in={this.props.logged_in}
                    user_id={this.props.user_id}
                    handle_post={this.handle_post}
                    username={this.props.username}
                    posts={this.props.posts}
                />
            </div>
        );
    }
}
