import React from 'react';
import Card from 'react-bootstrap/Card';
import PicturesPosts from './Posts';
import NewPostForm from './NewPostForm';

export default class PicturesBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            update_posts: false
        }
        this.makeUpdatePosts = this.makeUpdatePosts.bind(this);
    }

    makeUpdatePosts() {
        console.log('We made it to the makeUpdatePosts');
        if (this.state.update_posts) {
            this.setState({
                update_posts: false
            })
        } else {
            this.setState({
                update_posts: true
            })
        }
        console.log(this.state.update_posts);
    }


    render() {
        const isLoggedIn = this.props.logged_in;
        let postForm;
        if (isLoggedIn) {
            postForm = <NewPostForm
                            user_id={this.props.user_id}
                            handle_post={this.props.handle_post}
                            post_redirect={this.props.post_redirect}
                            history={this.props.history}
                            makeUpdatePosts={this.makeUpdatePosts}
                        />
        }

        return (
            <div className="body">
                <h1>All Posts</h1>
                {postForm}
                <br/>
                <PicturesPosts
                    logged_in={this.props.logged_in}
                    user_id={this.props.user_id}
                    handle_post={this.handle_post}
                    username={this.props.username}
                    posts={this.props.posts}
                    update_posts={this.state.update_posts}
                    makeUpdatePosts={this.makeUpdatePosts}
                />
            </div>
        );
    }
}
