import React from 'react';
import NewPostForm from './NewPostForm';


export default class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Create a New Post</h1>
                <NewPostForm
                    user_id={this.props.user_id}
                    handle_post={this.props.handle_post}
                    redirect={this.props.redirect}
                />
            </div>
        )
    }
}
