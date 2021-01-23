import React from 'react';
import DayCard from 'DayCard.js';
import apiConfig from './../../apiKeys';

export default class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: []
    }

    componentDidMount = () => {
        console.log(apiConfig);
        console.log(apiConfig.owmKey);
        const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=${apiConfig.owmKey}`
    
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            this.setState({
                fullData: data.list,
                dailyData: dailyData
            }, () => console.log(this.state))
        })
    }

    formatDatCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
                <h5 className="display-5 text-muted">New York, US</h5>
                <div className="row justify-content-center">
                    {this.formatDayCards()}
                </div>
            </div>
        )
    }
}