import React from 'react';
import Card from 'react-bootstrap/Card';
import PicturesPosts from './Posts';
import NewPostForm from './NewPostForm';
import Paginator from './Paginator';

export default class PicturesBody extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const isLoggedIn = this.props.logged_in;
        let postForm;
        if (isLoggedIn) {
            postForm = <NewPostForm
                            user_id={this.props.user_id}
                            handle_post={this.props.handle_post}
                            redirect={this.props.redirect}
                        />
        }

        return (
            <div className="body">
                <h1>All Posts</h1>
                {postForm}
                <br/>
                <Paginator />
                <PicturesPosts
                    logged_in={this.props.logged_in}
                    user_id={this.props.user_id}
                    handle_post={this.handle_post}
                    username={this.props.username}
                    redirect={this.props.redirect}
                    posts={this.props.posts}
                />
                <Paginator />
            </div>
        );
    }
}
