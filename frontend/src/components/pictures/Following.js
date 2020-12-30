import React from 'react';
import Paginator from './Paginator';
import PicturesPosts from './Posts';

export default class Following extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Following Posts</h1>
                <PicturesPosts 
                    logged_in={this.props.logged_in}
                    user_id={this.props.user_id}
                    handle_post={this.handle_post}
                    username={this.props.username}
                    redirect={this.props.redirect}
                    posts={this.props.posts}
                />
            </div>
        );
    }
}
