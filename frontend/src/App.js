import React, { Component } from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

import './App.css';
import WeekContainer from './components/weather/WeekContainer';

import LoginForm from './components/pictures/LoginForm';
import RegisterForm from './components/pictures/RegisterForm';

function Map() {
    return (
        <GoogleMap 
            defaultZoom={10} 
            defaultCenter={{ lat: 35.1495, lng: -90.0490 }}
        />
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        return (
            <div className="App" style={{ width: '100vw', height: '100vh' }}>
                <WrappedMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`} 
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />} 
                />
            </div>
        );
    }
}
