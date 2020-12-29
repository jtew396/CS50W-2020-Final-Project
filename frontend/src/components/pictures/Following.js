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
                <Paginator />
                <PicturesPosts />
                <Paginator />
            </div>
        );
    }
}
