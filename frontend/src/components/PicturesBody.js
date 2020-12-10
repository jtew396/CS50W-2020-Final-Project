import React from 'react';
import Card from 'react-bootstrap/Card';

export default class PicturesBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="body m-3">
                <div className="row">
                    <div className="col"></div>
                    <Card className="col py-4">
                    </Card>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}
