import React from 'react';
import Card from 'react-bootstrap/Card';
import PicturesAllPosts from './pictures/AllPosts';

export default class PicturesBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="body m-3">
                <PicturesAllPosts />
            </div>
        );
    }
}
