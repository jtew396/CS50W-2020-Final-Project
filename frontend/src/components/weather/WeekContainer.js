import React from 'react';
import DayCard from './DayCard';
import DegreeToggle from './DegreeToggle';
import apiConfig from './../../apiKeys';

export default class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit"
    }

    componentDidMount = () => {
        console.log(apiConfig);
        console.log(apiConfig.owmKey);
        const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?zip=38104&units=imperial&APPID=${apiConfig.owmKey}`
    
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

    updateForecastDegree = event => {
        this.setState({
            degreeType: event.target.value
        }, () => console.log(this.state))
    }

    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} degreeType={this.state.degreeType} key={index} />)
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
                <h5 className="display-5 text-muted">Memphis, TN</h5>
                <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree}/>
                <div className="row justify-content-center">
                    {this.formatDayCards()}
                </div>
            </div>
        )
    }
}