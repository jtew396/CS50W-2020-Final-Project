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
        let isLoggedIn = this.props.logged_in;
        let newPost;
        if (isLoggedIn) {
            newPost = <PicturesNewPost />
        } else {
            newPost = null;
        }
        
        return (
            <div>
                <h1>All Posts</h1>
                {newPost}
                <br/>
                <Paginator></Paginator>
                <PicturesPosts></PicturesPosts>
                <Paginator></Paginator>
            </div>
        );
    }
}