import React from 'react';
import Card from 'react-bootstrap/Card';

export default class PicturesBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginActive: true,
        }
    }

    changeState() {
        const { isLoginActive } = this.state;
        this.setState((prevState) => ({ isLoginActive: !prevState.isLoginActive }))
    }

    render() {
        const { isLoginActive } = this.state;
        const current = isLoginActive ? "Register" : "Login";
        const currentActive = isLoginActive ? "login" : "register";
        return (
            <div className="body m-3">
                <div className="row">
                    <div className="col"></div>
                    <Card className="col py-4">
                    </Card>
                    <div className="col"></div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col"></div>
                    <Card className="col">
                    </Card>
                    <div className="col"></div>
                </div>
            </div>
        );
    }
}
