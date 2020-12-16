import React from 'react';
import Card from 'react-bootstrap/Card';

export default class PicturesPosts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card className="shadow my-2">
                    <Card.Body>
                        <Card.Title>Title 1</Card.Title>
                        <Card.Text>Text 1</Card.Text>
                    </Card.Body>
                </Card>
                <Card className="shadow my-2">
                    <Card.Body>
                        <Card.Title>Title 2</Card.Title>
                        <Card.Text>Text 2</Card.Text>
                    </Card.Body>
                </Card>
                <Card className="shadow my-2">
                    <Card.Body>
                        <Card.Title>Title 3</Card.Title>
                        <Card.Text>Text 3</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}